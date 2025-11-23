"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function ReactiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const mousePos = useRef(new THREE.Vector3());

  const particleCount = 2000;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distribute particles in a volume
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Random drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return [positions, velocities];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Update mouse position in 3D space
    mousePos.current.set(pointer.x * 10, pointer.y * 10, 0);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Drift animation
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Create particle position vector
      const particlePos = new THREE.Vector3(
        positions[i3],
        positions[i3 + 1],
        positions[i3 + 2]
      );

      // Mouse repulsion
      const distance = particlePos.distanceTo(mousePos.current);
      if (distance < 3) {
        const force = (3 - distance) / 3;
        const direction = particlePos.clone().sub(mousePos.current).normalize();

        positions[i3] += direction.x * force * 0.05;
        positions[i3 + 1] += direction.y * force * 0.05;
        positions[i3 + 2] += direction.z * force * 0.03;
      }

      // Boundary wrap
      if (Math.abs(positions[i3]) > 10) positions[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
