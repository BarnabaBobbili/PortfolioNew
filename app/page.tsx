"use client";

import { useState, useEffect } from "react";
import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { HeroSection } from "@/components/hero";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { About } from "@/components/ui/About";
import { Work } from "@/components/ui/Work";
import { Skills } from "@/components/ui/Skills";
import { Publications } from "@/components/ui/Publications";
import { Education } from "@/components/ui/Education";
import { Certifications } from "@/components/ui/Certifications";
import { Contact } from "@/components/ui/Contact";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export default function Home() {
  // Start with default values to avoid hydration mismatch
  const [particleDirection, setParticleDirection] = useState<'towards' | 'away'>('towards');
  const [textMode, setTextMode] = useState<'3d' | 'decode'>('3d');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client after mount to avoid hydration mismatch
    setMounted(true);

    // Randomly choose particle direction
    const directions: ('towards' | 'away')[] = ['towards', 'away'];
    setParticleDirection(directions[Math.floor(Math.random() * directions.length)]);

    // Randomly choose text mode
    const modes: ('3d' | 'decode')[] = ['3d', 'decode'];
    setTextMode(modes[Math.floor(Math.random() * modes.length)]);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force decode on mobile
  const effectiveTextMode = isMobile ? 'decode' : textMode;

  return (
    <main className="relative">
      <CustomCursor />
      <SceneCanvas
        particleDirection={particleDirection}
        show3DText={effectiveTextMode === '3d'}
      />

      <div className="relative z-10">
        <HeroSection textMode={effectiveTextMode} />
        <About />
        <Work />
        <Skills />
        <InfiniteMarquee text="CREATIVE DEVELOPER • RESEARCHER • ENGINEER" baseVelocity={2} />
        <Publications />
        <Education />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
