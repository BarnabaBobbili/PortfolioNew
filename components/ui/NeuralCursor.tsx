"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Neural Interface Cursor - Exclusive Cyberpunk Design
 *
 * FEATURES:
 * - Hexagonal targeting reticle
 * - Particle trail system
 * - Corner brackets that track cursor
 * - Click ripple effect
 * - Hover state transformations
 * - Binary data stream
 * - Glitch effect on fast movement
 * - Theme-aware colors
 */

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  id: number;
}

export function NeuralCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [velocity, setVelocity] = useState(0);
  const particleIdRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Calculate velocity for glitch effect
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const vel = Math.sqrt(dx * dx + dy * dy);
      setVelocity(vel);

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Create particle trail
      if (Math.random() > 0.7) {
        const newParticle: Particle = {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: Math.random() * 4 + 2,
          id: particleIdRef.current++,
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Fade out particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const isGlitching = velocity > 20;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Particle Trail */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400 mix-blend-screen"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Main Cursor Container */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Center Dot */}
        <motion.div
          className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Hexagonal Reticle */}
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: isHovering ? 90 : 0,
            scale: isHovering ? 1.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Hexagon */}
          <motion.polygon
            points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="1.5"
            opacity="0.6"
            animate={{
              strokeDasharray: isGlitching ? "10 5" : "200 0",
            }}
          />

          {/* Corner Markers */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 30 + Math.cos(rad) * 20;
            const y = 30 + Math.sin(rad) * 20;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill="var(--theme-primary)"
                animate={{
                  scale: isHovering ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  repeat: isHovering ? Infinity : 0,
                }}
              />
            );
          })}

          {/* Scanning Line */}
          <motion.line
            x1="30"
            y1="30"
            x2="50"
            y2="30"
            stroke="var(--theme-primary)"
            strokeWidth="1"
            opacity="0.4"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "30px 30px" }}
          />
        </motion.svg>

        {/* Corner Brackets */}
        {!isClicking && (
          <>
            {/* Top Left */}
            <motion.svg
              width="20"
              height="20"
              className="absolute -left-8 -top-8"
              animate={{
                opacity: isHovering ? 1 : 0.3,
                x: isHovering ? -5 : 0,
                y: isHovering ? -5 : 0,
              }}
            >
              <path
                d="M 0 5 L 0 0 L 5 0"
                stroke="var(--theme-primary)"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>

            {/* Top Right */}
            <motion.svg
              width="20"
              height="20"
              className="absolute -right-8 -top-8"
              animate={{
                opacity: isHovering ? 1 : 0.3,
                x: isHovering ? 5 : 0,
                y: isHovering ? -5 : 0,
              }}
            >
              <path
                d="M 20 5 L 20 0 L 15 0"
                stroke="var(--theme-primary)"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>

            {/* Bottom Left */}
            <motion.svg
              width="20"
              height="20"
              className="absolute -left-8 -bottom-8"
              animate={{
                opacity: isHovering ? 1 : 0.3,
                x: isHovering ? -5 : 0,
                y: isHovering ? 5 : 0,
              }}
            >
              <path
                d="M 0 15 L 0 20 L 5 20"
                stroke="var(--theme-primary)"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>

            {/* Bottom Right */}
            <motion.svg
              width="20"
              height="20"
              className="absolute -right-8 -bottom-8"
              animate={{
                opacity: isHovering ? 1 : 0.3,
                x: isHovering ? 5 : 0,
                y: isHovering ? 5 : 0,
              }}
            >
              <path
                d="M 20 15 L 20 20 L 15 20"
                stroke="var(--theme-primary)"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>
          </>
        )}

        {/* Outer Ring - Pulses on Hover */}
        <motion.div
          className="absolute w-12 h-12 -left-6 -top-6 rounded-full border"
          style={{
            borderColor: "var(--theme-primary)",
          }}
          animate={{
            scale: isHovering ? [1, 1.2, 1] : 1,
            opacity: isHovering ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            duration: 1,
            repeat: isHovering ? Infinity : 0,
          }}
        />

        {/* Click Ripple Effect */}
        {isClicking && (
          <motion.div
            className="absolute w-16 h-16 -left-8 -top-8 rounded-full border-2"
            style={{
              borderColor: "var(--theme-primary)",
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Binary Data Stream (appears on hover) */}
        {isHovering && (
          <motion.div
            className="absolute -top-12 left-0 font-mono text-[8px] whitespace-nowrap"
            style={{ color: "var(--theme-primary)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        )}

        {/* Glitch Effect on Fast Movement */}
        {isGlitching && (
          <>
            <motion.div
              className="absolute w-10 h-10 -left-5 -top-5 border border-red-500 rounded-full"
              animate={{
                x: [-2, 2, -2],
                y: [2, -2, 2],
              }}
              transition={{ duration: 0.1 }}
              style={{ opacity: 0.3 }}
            />
            <motion.div
              className="absolute w-10 h-10 -left-5 -top-5 border border-cyan-500 rounded-full"
              animate={{
                x: [2, -2, 2],
                y: [-2, 2, -2],
              }}
              transition={{ duration: 0.1 }}
              style={{ opacity: 0.3 }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
