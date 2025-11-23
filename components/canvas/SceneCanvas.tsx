"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { VoidBackground } from "@/components/hero/VoidBackground";
import { LiquidArtifact } from "@/components/hero/LiquidArtifact";
import { ReactiveParticles } from "@/components/hero/ReactiveParticles";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-based canvas effects
      gsap.to(containerRef.current, {
        opacity: 0.3,
        scale: 1.2,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1000",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
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
          <ReactiveParticles />

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
