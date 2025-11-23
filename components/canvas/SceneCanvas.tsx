"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { VoidBackground } from "@/components/hero/VoidBackground";
import { LiquidArtifact } from "@/components/hero/LiquidArtifact";
import { ReactiveParticles } from "@/components/hero/ReactiveParticles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <VoidBackground />
          <LiquidArtifact />
          <ReactiveParticles />

          <EffectComposer>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
