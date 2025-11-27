"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { TechCluster } from "@/components/hero/TechCluster";

/**
 * SkillsCanvas Component
 *
 * Dedicated Three.js canvas for the Skills section's TechCluster system.
 * Positioned absolutely within the Skills section container.
 *
 * FEATURES:
 * - Separate canvas from hero section for better performance
 * - Transparent background to overlay on section content
 * - Camera positioned to frame the skill cards cluster
 * - Suspense wrapper for loading states
 * - Passes containerRef to TechCluster for ScrollTrigger animation
 */

interface SkillsCanvasProps {
  containerRef: React.RefObject<HTMLElement>;
}

export function SkillsCanvas({ containerRef }: SkillsCanvasProps) {
  // Prevent hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }} // Camera positioned for skill cards cluster
        dpr={[1, 1.5]} // Device pixel ratio for performance
        gl={{
          antialias: true,
          alpha: true, // Transparent background
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <TechCluster containerRef={containerRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
