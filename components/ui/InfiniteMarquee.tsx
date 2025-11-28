"use client";

import { useRef, useEffect, useState } from "react";
import { useAnimationFrame } from "framer-motion";

interface InfiniteMarqueeProps {
  text: string;
  baseVelocity?: number;
}

export function InfiniteMarquee({
  text,
  baseVelocity = 1,
}: InfiniteMarqueeProps) {
  const [velocity, setVelocity] = useState(baseVelocity);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollVelocity = Math.abs(scrollY - (handleScroll as any).lastY || 0);
      (handleScroll as any).lastY = scrollY;

      const newVelocity = baseVelocity + scrollVelocity * 0.05;
      setVelocity(Math.min(newVelocity, baseVelocity * 5));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [baseVelocity]);

  useAnimationFrame((t, delta) => {
    if (!textRef.current) return;

    const speedMultiplier = isHovered ? 0.3 : 1;
    const moveBy = velocity * speedMultiplier * (delta / 1000) * 100;
    x.current -= moveBy;

    const textWidth = textRef.current.scrollWidth / 2;

    // Seamless circular loop
    if (Math.abs(x.current) >= textWidth) {
      x.current = 0;
    }

    textRef.current.style.transform = `translateX(${x.current}px)`;
  });

  // Split text into parts and add decorative separators
  const textParts = text.split("•").map(part => part.trim());

  // Create single element that will be repeated
  const marqueeContent = (
    <>
      {textParts.map((part, i) => (
        <span key={i} className="inline-flex items-center gap-4 md:gap-8">
          <span className="relative group inline-block">
            {part}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 group-hover:w-full transition-all duration-500"></span>
          </span>
          {i < textParts.length - 1 && (
            <span className="text-cyan-400 animate-pulse">◆</span>
          )}
        </span>
      ))}
      <span className="text-cyan-400/60 mx-4 md:mx-8">⟡</span>
    </>
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-r from-void/80 via-void-light/60 to-void/80 border-y border-cyan-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan"></div>
      </div>

      {/* Marquee text */}
      <div
        ref={textRef}
        className="flex whitespace-nowrap font-mono text-4xl md:text-7xl lg:text-8xl font-bold transition-all duration-300"
        style={{
          willChange: 'transform',
          color: glitchActive ? 'var(--theme-light)' : isHovered ? 'var(--theme-primary)' : 'rgba(255, 255, 255, 0.2)',
          textShadow: glitchActive ? '2px 2px 0px #ff00ff, -2px -2px 0px var(--theme-light)' : 'none',
          filter: isHovered ? `drop-shadow(0 0 20px rgba(var(--theme-glow), 0.5))` : 'none'
        }}
      >
        {/* Repeat content for seamless loop */}
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
        <span className={glitchActive ? 'animate-glitch-skew' : ''}>{marqueeContent}</span>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 1;
          }
        }
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(-2deg);
          }
          40% {
            transform: skew(2deg);
          }
          60% {
            transform: skew(-1deg);
          }
          80% {
            transform: skew(1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-glitch-skew {
          animation: glitch-skew 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
