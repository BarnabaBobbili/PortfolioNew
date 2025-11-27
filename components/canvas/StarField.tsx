"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import starfieldVertex from "@/shaders/starfield.vert";
// @ts-ignore
import starfieldFragment from "@/shaders/starfield.frag";

/**
 * StarField Component
 *
 * Creates an animated star field background using custom GLSL shaders.
 * The stars respond to mouse movement and animate over time.
 *
 * USE CASE: Alternative background option for the 3D scene
 * STATUS: Not currently in use - available for future implementation
 *
 * USAGE: Add to SceneCanvas to replace or complement VoidBackground
 * Example: <StarField />
 *
 * REQUIRES: starfield.vert and starfield.frag shader files in /shaders
 */

export function StarField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree(); // Get viewport size and mouse position

  // Initialize shader uniforms (values passed to shaders)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 }, // Elapsed time for animations
      uMouse: { value: new THREE.Vector2(0, 0) }, // Normalized mouse position (0-1)
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }, // Screen size
    }),
    [viewport]
  );

  // Update shader uniforms every frame
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;

      // Update time for animated effects
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Convert pointer position from (-1 to 1) to (0 to 1) range
      material.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      {/* Large plane covering the viewport, positioned behind other elements */}
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
