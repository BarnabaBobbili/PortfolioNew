"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import liquidVertex from "@/shaders/liquid.vert";
// @ts-ignore
import liquidFragment from "@/shaders/liquid.frag";

/**
 * LiquidArtifact Component
 *
 * The central animated sphere with liquid-like shader effects.
 * This is the main visual focal point of the hero section.
 *
 * FEATURES:
 * - Morphing liquid surface using GLSL shaders
 * - Mouse-reactive rotation (follows cursor movement)
 * - Automatic slow spin on Z-axis
 * - Gentle floating animation (up/down bobbing)
 * - Blue gradient coloring with transparency
 *
 * GEOMETRY: Icosahedron (20-sided polyhedron) with 24 subdivisions for smoothness
 * POSITION: Center of scene (0, 0, 0)
 * REQUIRES: liquid.vert and liquid.frag shader files in /shaders
 */

export function LiquidArtifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  // Shader uniforms controlling the liquid effect
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 }, // Animation timer
      uFrequency: { value: 1.5 }, // Wave frequency (higher = more waves)
      uAmplitude: { value: 0.3 }, // Wave strength (higher = bigger distortions)
      uColor: { value: new THREE.Color(0.1, 0.3, 0.6) }, // Deep blue color - no white
      uRefractionStrength: { value: 0.1 }, // Light refraction amount
      uTexture: { value: null }, // Optional texture (currently unused)
    }),
    []
  );

  // Animation loop - runs every frame
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;

      // Update time for shader animations
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // === MOUSE-REACTIVE ROTATION ===
      // Calculate target rotation based on mouse position
      const targetX = pointer.y * 0.5; // Vertical mouse -> X rotation
      const targetY = pointer.x * 0.5; // Horizontal mouse -> Y rotation

      // Smoothly interpolate to target rotation (lerp = linear interpolation)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetX,
        0.1 // Interpolation speed (0.1 = smooth, gradual)
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetY,
        0.1
      );

      // === AUTOMATIC ROTATION ===
      // Add subtle automatic spin on Z-axis
      meshRef.current.rotation.z += 0.001;

      // === FLOATING ANIMATION ===
      // Gentle up/down bobbing using sine wave
      // 0.5 = speed, 0.1 = amplitude (distance of movement)
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Icosahedron: args[0] = radius (1), args[1] = subdivisions (24 for smooth surface) */}
      <icosahedronGeometry args={[1, 24]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={liquidVertex}
        fragmentShader={liquidFragment}
        transparent={true} // Enable transparency
        side={THREE.DoubleSide} // Render both front and back faces
      />
    </mesh>
  );
}
