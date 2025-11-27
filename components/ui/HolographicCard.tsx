"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Holographic gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-color-dodge pointer-events-none transition-opacity duration-300 hover:opacity-60"
        style={{
          background: `
            radial-gradient(
              circle at ${glowPosition.x}% ${glowPosition.y}%,
              rgba(255, 100, 255, 0.8) 0%,
              rgba(100, 200, 255, 0.6) 25%,
              rgba(100, 255, 200, 0.4) 50%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Rainbow shimmer effect */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          background: `
            linear-gradient(
              115deg,
              transparent 0%,
              rgba(255, 50, 200, 0.5) 25%,
              rgba(100, 150, 255, 0.5) 50%,
              rgba(50, 255, 200, 0.5) 75%,
              transparent 100%
            )
          `,
          transform: `translateX(${(glowPosition.x - 50) * 0.5}px) translateY(${(glowPosition.y - 50) * 0.5}px)`,
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Chromatic aberration edge glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          boxShadow: `
            inset 0 0 20px rgba(100, 200, 255, 0.3),
            inset 0 0 40px rgba(255, 100, 255, 0.2)
          `,
        }}
      />
    </motion.div>
  );
}
