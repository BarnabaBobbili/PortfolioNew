"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import voidVertex from "@/shaders/void.vert";
// @ts-ignore
import voidFragment from "@/shaders/void.frag";

/**
 * VoidBackground Component
 *
 * Creates a dynamic gradient background using custom GLSL shaders.
 * Provides the dark, atmospheric backdrop for the hero section.
 *
 * FEATURES:
 * - Animated gradient that responds to time
 * - Mouse-reactive colors/patterns
 * - Smooth interpolation for natural movement
 *
 * POSITION: Furthest back (z: -5) behind all other 3D elements
 * REQUIRES: void.vert and void.frag shader files in /shaders
 */

export function VoidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer, size } = useThree();

  // Shader uniforms (variables passed to shaders)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 }, // Animation timer
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // Mouse position (0-1 range)
      uResolution: { value: new THREE.Vector2(size.width, size.height) }, // Screen dimensions
    }),
    [size]
  );

  // Update uniforms every frame
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;

      // Update time for animations
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse tracking using linear interpolation (lerp)
      // Converts pointer from (-1 to 1) range to (0 to 1) range
      // 0.05 = interpolation speed (slower = smoother)
      material.uniforms.uMouse.value.lerp(
        new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2),
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      {/* Large plane covering entire viewport, positioned furthest back */}
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
