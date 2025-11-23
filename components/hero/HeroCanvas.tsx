"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { VoidBackground } from "./VoidBackground";
import { ReactiveParticles } from "./ReactiveParticles";
import { LiquidArtifact } from "./LiquidArtifact";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  return (
    <>
      <VoidBackground />
      <ReactiveParticles />
      <LiquidArtifact />

      <EffectComposer>
        {/* Bloom for glowing elements */}
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
        />

        {/* Chromatic Aberration for sci-fi lens effect */}
        <ChromaticAberration
          offset={new THREE.Vector2(0.003, 0.003)}
          radialModulation={true}
          modulationOffset={0.5}
          blendFunction={BlendFunction.NORMAL}
        />

        {/* Film grain overlay */}
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.15}
        />

        {/* Subtle vignette */}
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scroll-based canvas effects
    const ctx = gsap.context(() => {
      gsap.to(canvasRef.current, {
        opacity: 0.3,
        scale: 1.2,
        filter: "blur(5px)",
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={canvasRef} className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
