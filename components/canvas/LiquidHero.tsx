"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import liquidVertex from "@/shaders/liquid.vert";
// @ts-ignore
import liquidFragment from "@/shaders/liquid.frag";

export function LiquidHero() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrequency: { value: 1.5 },
      uAmplitude: { value: 0.3 },
      uColor: { value: new THREE.Color(0.2, 0.4, 0.8) },
      uRefractionStrength: { value: 0.1 },
      uTexture: { value: null },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Rotate based on mouse position
      meshRef.current.rotation.x = pointer.y * 0.3;
      meshRef.current.rotation.y = pointer.x * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={liquidVertex}
        fragmentShader={liquidFragment}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
