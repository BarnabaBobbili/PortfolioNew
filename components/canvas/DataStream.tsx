"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DataStream() {
  const pointsRef = useRef<THREE.Points>(null);

  // Create stream paths using Bezier curves
  const { positions, velocities } = useMemo(() => {
    const particleCount = 100;
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Random position along various paths
      const path = i % 4;
      const t = (i / particleCount) * 2 * Math.PI;

      switch (path) {
        case 0: // Spiral
          pos[i * 3] = Math.cos(t) * 2;
          pos[i * 3 + 1] = Math.sin(t) * 2;
          pos[i * 3 + 2] = t - 5;
          break;
        case 1: // Vertical stream
          pos[i * 3] = (Math.random() - 0.5) * 4;
          pos[i * 3 + 1] = Math.random() * 10 - 5;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
          break;
        case 2: // Horizontal stream
          pos[i * 3] = Math.random() * 10 - 5;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
          break;
        default: // Circular orbit
          pos[i * 3] = Math.cos(t) * 3;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
          pos[i * 3 + 2] = Math.sin(t) * 3;
      }

      vel[i] = Math.random() * 0.02 + 0.01;
    }

    return { positions: pos, velocities: vel };
  }, []);

  // Animate particles along paths
  useFrame((state) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;

    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;
      const path = i % 4;

      // Move particle
      switch (path) {
        case 0: // Spiral
          positions[i3 + 2] += velocities[i];
          if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
          break;
        case 1: // Vertical
          positions[i3 + 1] += velocities[i];
          if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
          break;
        case 2: // Horizontal
          positions[i3] += velocities[i];
          if (positions[i3] > 5) positions[i3] = -5;
          break;
        default: // Orbit
          const angle = state.clock.elapsedTime * velocities[i];
          positions[i3] = Math.cos(angle) * 3;
          positions[i3 + 2] = Math.sin(angle) * 3;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="var(--theme-primary)"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
