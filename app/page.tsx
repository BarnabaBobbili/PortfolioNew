"use client";

import { useState, useEffect } from "react";
import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { HeroSection } from "@/components/hero";
import { QuantumCursor } from "@/components/ui/QuantumCursor";
import { Navbar } from "@/components/ui/Navbar";
import { Terminal } from "@/components/ui/ArchTerminal";
import { SystemHUD } from "@/components/ui/SystemHUD";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingSequence } from "@/components/ui/LoadingSequence";
import { BinaryMargin } from "@/components/ui/BinaryMargin";
import { EasterEggs } from "@/components/ui/EasterEggs";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";
import { StaticNoise } from "@/components/ui/StaticNoise";
import { CyberBorders } from "@/components/ui/CyberBorders";
import { VignetteEffect } from "@/components/ui/VignetteEffect";
import { About } from "@/components/ui/About";
import { Work } from "@/components/ui/Work";
import { Skills } from "@/components/ui/Skills";
import { Publications } from "@/components/ui/Publications";
import { Education } from "@/components/ui/Education";
import { Certifications } from "@/components/ui/Certifications";
import { Contact } from "@/components/ui/Contact";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

import type { ControlPanelSettings } from "@/components/ui/ControlPanel";

type Theme = "blue" | "cyan" | "purple" | "green" | "red";

export default function Home() {
  // Start with default values to avoid hydration mismatch
  const [particleDirection, setParticleDirection] = useState<'towards' | 'away'>('towards');
  const [textMode, setTextMode] = useState<'3d' | 'decode'>('3d');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Current theme (synced with ControlPanel)
  const [currentTheme, setCurrentTheme] = useState<Theme>("blue");

  // Effects settings from ControlPanel
  const [effectsSettings, setEffectsSettings] = useState<ControlPanelSettings>({
    staticNoise: false,
    particleNetwork: false,
    matrixRain: false,
    scanlines: false,
  });

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
      <LoadingSequence />
      <CyberBorders />
      <VignetteEffect />
      <Navbar />
      <Terminal
        onThemeChange={setCurrentTheme}
        onEffectsChange={setEffectsSettings}
        currentEffects={effectsSettings}
        currentTheme={currentTheme}
      />
      <SystemHUD />
      <ScanlineOverlay isEnabled={effectsSettings.scanlines} />
      <MatrixRain isEnabled={effectsSettings.matrixRain} />
      <BinaryMargin />
      <ParticleNetwork isEnabled={effectsSettings.particleNetwork} />
      <StaticNoise isEnabled={effectsSettings.staticNoise} />
      <EasterEggs />
      <ControlPanel
        onSettingsChange={setEffectsSettings}
        onThemeChange={setCurrentTheme}
        currentTheme={currentTheme}
        currentEffects={effectsSettings}
      />
      <ScrollProgress />
      <QuantumCursor />
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
