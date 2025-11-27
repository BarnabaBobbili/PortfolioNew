"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  glitchOnHover?: boolean;
  continuous?: boolean;
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({
  children,
  className = "",
  glitchOnHover = true,
  continuous = false,
  intensity = "medium",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);

  // Intensity settings
  const intensitySettings = {
    low: { offset: 2, duration: 0.3 },
    medium: { offset: 4, duration: 0.2 },
    high: { offset: 8, duration: 0.1 },
  };

  const settings = intensitySettings[intensity];

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Red glitch layer */}
      {isGlitching && (
        <motion.span
          className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen pointer-events-none"
          animate={{
            x: [0, -settings.offset, settings.offset, -settings.offset, 0],
            y: [0, settings.offset, -settings.offset, 0, 0],
          }}
          transition={{
            duration: settings.duration,
            repeat: continuous ? Infinity : 3,
            repeatType: "mirror",
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}

      {/* Cyan glitch layer */}
      {isGlitching && (
        <motion.span
          className="absolute top-0 left-0 text-cyan-500 opacity-70 mix-blend-screen pointer-events-none"
          animate={{
            x: [0, settings.offset, -settings.offset, settings.offset, 0],
            y: [0, -settings.offset, settings.offset, 0, 0],
          }}
          transition={{
            duration: settings.duration,
            repeat: continuous ? Infinity : 3,
            repeatType: "mirror",
            delay: 0.05,
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}

      {/* Blue glitch layer */}
      {isGlitching && (
        <motion.span
          className="absolute top-0 left-0 text-blue-500 opacity-50 mix-blend-screen pointer-events-none"
          animate={{
            x: [0, settings.offset * 1.5, -settings.offset * 1.5, 0],
            y: [0, -settings.offset * 0.5, settings.offset * 0.5, 0],
          }}
          transition={{
            duration: settings.duration * 1.2,
            repeat: continuous ? Infinity : 2,
            repeatType: "mirror",
            delay: 0.1,
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}
    </div>
  );
}
