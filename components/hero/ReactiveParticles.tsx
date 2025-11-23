"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const FLEE_DISTANCE = 3.0;
const FLEE_STRENGTH = 0.5;
const RETURN_SPEED = 0.02;

export function ReactiveParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { pointer, viewport } = useThree();

  // Store data in refs
  const velocitiesRef = useRef<Float32Array | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const initializedRef = useRef(false);

  useFrame(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;

    // Initialize on first frame
    if (!initializedRef.current) {
      const count = positionAttr.count;
      velocitiesRef.current = new Float32Array(count * 3);
      originalPositionsRef.current = new Float32Array(positionAttr.array.length);
      originalPositionsRef.current.set(positionAttr.array as Float32Array);
      initializedRef.current = true;
    }

    const positions = positionAttr.array as Float32Array;
    const velocities = velocitiesRef.current!;
    const originalPositions = originalPositionsRef.current!;

    // Convert pointer to world space
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Calculate distance from mouse (2D)
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply flee force if too close to mouse
      if (distance < FLEE_DISTANCE && distance > 0.01) {
        const force = ((FLEE_DISTANCE - distance) / FLEE_DISTANCE) * FLEE_STRENGTH;
        velocities[i3] += (dx / distance) * force;
        velocities[i3 + 1] += (dy / distance) * force;
      }

      // Return to original position
      velocities[i3] += (originalPositions[i3] - x) * RETURN_SPEED;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - y) * RETURN_SPEED;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - z) * RETURN_SPEED;

      // Apply friction
      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;

      // Update positions
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
    }

    positionAttr.needsUpdate = true;
  });

  // Generate initial positions
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 12;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#66aaff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
