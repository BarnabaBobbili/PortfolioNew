"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import voidVertex from "@/shaders/void.vert";
// @ts-ignore
import voidFragment from "@/shaders/void.frag";

export function VoidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse tracking
      material.uniforms.uMouse.value.lerp(
        new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2),
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={voidVertex}
        fragmentShader={voidFragment}
        transparent={false}
      />
    </mesh>
  );
}
