"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { VoidBackground } from "@/components/hero/VoidBackground";
import { LiquidArtifact } from "@/components/hero/LiquidArtifact";
import { ReactiveParticles } from "@/components/hero/ReactiveParticles";
import { GlowingName3D } from "@/components/hero/GlowingName3D";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * SceneCanvas Component
 *
 * Main 3D scene container that renders all Three.js/R3F (React Three Fiber) elements
 * for the hero section background. This is the ONLY canvas wrapper being used.
 *
 * STRUCTURE:
 * - VoidBackground: Dark gradient background mesh
 * - LiquidArtifact: Central animated liquid sphere
 * - ReactiveParticles: Interactive particle system that responds to mouse
 * - GlowingName3D: 3D text displaying your name
 * - Bloom: Post-processing effect for glowing elements
 *
 * POSITIONING: Fixed behind all content (z-index: -10)
 * INTERACTIVITY: Pointer events disabled so clicks pass through to page content
 */

interface SceneCanvasProps {
  particleDirection?: 'towards' | 'away';
  show3DText?: boolean; // Whether to show 3D glowing name
}

export function SceneCanvas({ particleDirection = 'towards', show3DText = true }: SceneCanvasProps) {
  // Prevent hydration issues by mounting only on client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder div during server-side rendering
  if (!mounted) {
    return <div className="fixed inset-0 z-[6]" />;
  }

  return (
    <div className="fixed inset-0 z-[6] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }} // Camera 5 units back, 75° field of view
        dpr={[1, 1.5]} // Device pixel ratio: min 1, max 1.5 for performance
        gl={{
          antialias: false, // Disabled for better performance
          alpha: true, // Transparent background
          powerPreference: "high-performance", // Request high-performance GPU
        }}
        eventSource={document.documentElement} // Track mouse events from entire document
        eventPrefix="client" // Use clientX/clientY for mouse coordinates
      >
        {/* Suspense prevents render until all components are loaded */}
        <Suspense fallback={null}>
          {/* Background gradient mesh */}
          <VoidBackground />

          {/* Central animated liquid sphere */}
          <LiquidArtifact />

          {/* Mouse-reactive particle system with direction control */}
          <ReactiveParticles direction={particleDirection} />

          {/* 3D glowing name text - only show if not using decode text */}
          {show3DText && <GlowingName3D />}

          {/* Post-processing effects */}
          {/* Bloom creates glow effect on bright elements */}
          {/*<EffectComposer>
            
            <Bloom
              intensity={0.5} // Glow strength
              luminanceThreshold={0.1} // Minimum brightness to glow
              luminanceSmoothing={0.9} // Smoothness of glow transition
              blendFunction={BlendFunction.ADD} // Additive blending for bright glow
            />
          </EffectComposer>*/}
        </Suspense>
      </Canvas>
    </div>
  );
}
