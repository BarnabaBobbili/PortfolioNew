"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { VoidBackground } from "@/components/hero/VoidBackground";
import { LiquidArtifact } from "@/components/hero/LiquidArtifact";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <VoidBackground />
          <LiquidArtifact />

          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.002, 0.002)}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise
              premultiply
              blendFunction={BlendFunction.OVERLAY}
              opacity={0.1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
