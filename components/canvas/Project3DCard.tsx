"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface Project3DCardProps {
  position: [number, number, number];
  title: string;
  index: number;
}

export function Project3DCard({ position, title, index }: Project3DCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.elapsedTime;

      // Float up and down
      meshRef.current.position.y = position[1] + Math.sin(time + index * 2) * 0.1;
      glowRef.current.position.y = meshRef.current.position.y;

      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;
      glowRef.current.rotation.y = meshRef.current.rotation.y;
    }
  });

  return (
    <group position={position}>
      {/* Card */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
          emissive="#1a4d7a"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glow outline */}
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.1, 1.3]} />
        <meshBasicMaterial
          color="var(--theme-primary)"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color="var(--theme-primary)"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono.ttf"
      >
        {title}
      </Text>

      {/* Corner brackets */}
      {[
        [-0.9, 0.5],
        [0.9, 0.5],
        [-0.9, -0.5],
        [0.9, -0.5],
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0.02]}>
          <boxGeometry args={[0.1, 0.1, 0.01]} />
          <meshBasicMaterial color="var(--theme-primary)" />
        </mesh>
      ))}
    </group>
  );
}
