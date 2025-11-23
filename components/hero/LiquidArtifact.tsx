"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function LiquidArtifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  // Create optimized icosphere geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 32);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation following mouse
      targetRotation.current.y = pointer.x * 0.5;
      targetRotation.current.x = pointer.y * 0.3;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );

      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        0.05
      );

      // Slow automatic rotation
      meshRef.current.rotation.z += 0.001;

      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main transmission material artifact */}
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          transmission={0.95}
          roughness={0.2}
          thickness={1.2}
          ior={1.45}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.05}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#88ccff"
          color="#ffffff"
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={0.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer energy ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.5}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
