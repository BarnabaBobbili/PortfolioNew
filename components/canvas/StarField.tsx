"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import starfieldVertex from "@/shaders/starfield.vert";
// @ts-ignore
import starfieldFragment from "@/shaders/starfield.frag";

export function StarField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    [viewport]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={starfieldVertex}
        fragmentShader={starfieldFragment}
        transparent={false}
      />
    </mesh>
  );
}
