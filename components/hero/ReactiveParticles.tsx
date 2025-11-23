"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const REPULSION_STRENGTH = 2.5;
const LERP_FACTOR = 0.08;

export function ReactiveParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { pointer, viewport, clock } = useThree();

  // Store data in refs
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const initializedRef = useRef(false);
  const startTimeRef = useRef(0);

  // Smooth mouse position
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const time = clock.getElapsedTime();

    // Initialize on first frame
    if (!initializedRef.current) {
      originalPositionsRef.current = new Float32Array(positionAttr.array.length);
      originalPositionsRef.current.set(positionAttr.array as Float32Array);
      startTimeRef.current = time;
      initializedRef.current = true;
    }

    const positions = positionAttr.array as Float32Array;
    const originalPositions = originalPositionsRef.current!;

    // Convert pointer to world space
    const targetMouseX = (pointer.x * viewport.width) / 2;
    const targetMouseY = (pointer.y * viewport.height) / 2;

    // Smooth interpolation of mouse position
    smoothMouseRef.current.x += (targetMouseX - smoothMouseRef.current.x) * LERP_FACTOR;
    smoothMouseRef.current.y += (targetMouseY - smoothMouseRef.current.y) * LERP_FACTOR;

    const mouseX = smoothMouseRef.current.x;
    const mouseY = smoothMouseRef.current.y;

    // Initial burst animation (fades out over 2 seconds)
    const timeSinceStart = time - startTimeRef.current;
    const initialBurst = Math.max(0, 1 - timeSinceStart / 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Calculate distance from mouse to original position
      const dx = origX - mouseX;
      const dy = origY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion calculation (like Galaxy shader)
      const repulsionFactor = (REPULSION_STRENGTH / (dist + 0.3)) * 0.2;

      let offsetX = 0;
      let offsetY = 0;

      if (dist > 0.01) {
        offsetX = (dx / dist) * repulsionFactor;
        offsetY = (dy / dist) * repulsionFactor;
      }

      // Initial burst - particles scatter outward from center
      if (initialBurst > 0) {
        const burstX = origX * initialBurst * 0.5;
        const burstY = origY * initialBurst * 0.5;
        offsetX += burstX;
        offsetY += burstY;
      }

      // Apply offset to original position
      positions[i3] = origX + offsetX;
      positions[i3 + 1] = origY + offsetY;
      positions[i3 + 2] = origZ;
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
