"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ChromaticTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function ChromaticText({
  children,
  className = "",
  intensity = 4,
}: ChromaticTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Red channel */}
      {isHovered && (
        <motion.span
          className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen pointer-events-none"
          animate={{
            x: [-intensity, intensity, -intensity, 0],
            y: [0, -intensity / 2, intensity / 2, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: 2,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(0.5px)",
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}

      {/* Cyan channel */}
      {isHovered && (
        <motion.span
          className="absolute top-0 left-0 text-cyan-500 opacity-70 mix-blend-screen pointer-events-none"
          animate={{
            x: [intensity, -intensity, intensity, 0],
            y: [0, intensity / 2, -intensity / 2, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: 2,
            ease: "easeInOut",
            delay: 0.05,
          }}
          style={{
            filter: "blur(0.5px)",
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}

      {/* Green channel */}
      {isHovered && (
        <motion.span
          className="absolute top-0 left-0 text-green-500 opacity-50 mix-blend-screen pointer-events-none"
          animate={{
            x: [0, intensity * 1.5, -intensity * 1.5, 0],
            y: [intensity / 2, -intensity, intensity, 0],
          }}
          transition={{
            duration: 0.25,
            repeat: 1,
            ease: "easeInOut",
            delay: 0.1,
          }}
          style={{
            filter: "blur(1px)",
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}
    </div>
  );
}
