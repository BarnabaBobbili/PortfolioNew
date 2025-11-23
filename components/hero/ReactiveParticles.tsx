"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 100;
const FLEE_DISTANCE = 2.5;
const FLEE_STRENGTH = 0.3;
const RETURN_SPEED = 0.02;

export function ReactiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5 - 2;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
    }

    return { positions, originalPositions, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    // Convert pointer to world space
    const mouseX = pointer.x * viewport.width / 2;
    const mouseY = pointer.y * viewport.height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Calculate distance from mouse (only in 2D for now)
      const dx = mouseX - x;
      const dy = mouseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply flee force if too close
      if (distance < FLEE_DISTANCE && distance > 0) {
        const force = (FLEE_DISTANCE - distance) / FLEE_DISTANCE;
        velocities[i3] -= (dx / distance) * force * FLEE_STRENGTH;
        velocities[i3 + 1] -= (dy / distance) * force * FLEE_STRENGTH;
      }

      // Return to original position
      const returnX = (originalPositions[i3] - x) * RETURN_SPEED;
      const returnY = (originalPositions[i3 + 1] - y) * RETURN_SPEED;
      const returnZ = (originalPositions[i3 + 2] - z) * RETURN_SPEED;

      velocities[i3] += returnX;
      velocities[i3 + 1] += returnY;
      velocities[i3 + 2] += returnZ;

      // Apply friction
      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;

      // Update positions
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
    }

    positionAttribute.needsUpdate = true;
  });

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
        size={0.05}
        color="#4488ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
