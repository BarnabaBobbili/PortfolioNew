"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { VoidBackground } from "@/components/hero/VoidBackground";
import { LiquidArtifact } from "@/components/hero/LiquidArtifact";
import { ReactiveParticles } from "@/components/hero/ReactiveParticles";
import { GlowingName3D } from "@/components/hero/GlowingName3D";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function SceneCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10" />;
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <VoidBackground />
          <LiquidArtifact />
          <ReactiveParticles />
          <GlowingName3D />

          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
