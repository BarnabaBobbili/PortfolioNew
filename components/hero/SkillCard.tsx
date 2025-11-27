"use client";

import { useRef, useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * SkillCard Component
 *
 * Individual frosted-glass card for displaying a skill name.
 * Features a high-tech glass material with edge glow and holographic appearance.
 *
 * MATERIAL:
 * - MeshPhysicalMaterial for realistic glass refraction
 * - Transmission for transparency
 * - Clearcoat for shiny surface
 * - Edge glow using backface rendering
 *
 * @param text - The skill name to display
 * @param position - 3D position in space [x, y, z]
 */

interface SkillCardProps {
  text: string;
  position: [number, number, number];
}

export default function SkillCard({ text, position }: SkillCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Create frosted glass material
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.1, 0.1, 0.15),
      metalness: 0,
      roughness: 0.2,
      transmission: 0.9, // Glass transparency
      thickness: 0.5, // Refraction depth
      clearcoat: 1.0, // Shiny surface layer
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
  }, []);

  // Edge glow material (cyan accent)
  const edgeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.4, 0.7, 1.0), // Light blue/cyan
      transparent: true,
      opacity: 0.6,
      side: THREE.BackSide,
    });
  }, []);

  return (
    <group position={position}>
      {/* Main glass card */}
      <mesh ref={meshRef} material={material}>
        <boxGeometry args={[1.4, 0.9, 0.05]} />
      </mesh>

      {/* Edge glow (slightly larger box rendered from back) */}
      <mesh material={edgeMaterial} scale={1.03}>
        <boxGeometry args={[1.4, 0.9, 0.05]} />
      </mesh>

      {/* Skill name text */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.18}
        color="#66aaff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {text}
      </Text>

      {/* Bottom accent line */}
      <mesh position={[0, -0.35, 0.03]}>
        <planeGeometry args={[1.0, 0.02]} />
        <meshBasicMaterial color="#66aaff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
