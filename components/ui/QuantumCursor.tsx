"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * QUANTUM ENERGY CORE CURSOR
 *
 * THE MOST EXCLUSIVE CURSOR EVER CREATED
 *
 * FEATURES:
 * - Quantum energy core with rotating particle rings
 * - Neural network connection trails
 * - Holographic data hand on hover (custom pointer)
 * - Energy burst on click with shockwave
 * - Gravitational distortion effect
 * - DNA helix orbiting particles
 * - Circuit board traces
 * - Breathing glow animation
 * - Electromagnetic field visualization
 * - Quantum state transitions
 */

interface EnergyParticle {
  id: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
}

interface TrailNode {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function QuantumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<EnergyParticle[]>([]);
  const [trails, setTrails] = useState<TrailNode[]>([]);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);
  const frameRef = useRef(0);
  const trailIdRef = useRef(0);

  // Precise 1:1 tracking with minimal lag
  const springConfig = { damping: 40, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Initialize orbiting particles
  useEffect(() => {
    const initialParticles: EnergyParticle[] = [];
    for (let i = 0; i < 20; i++) {
      initialParticles.push({
        id: i,
        angle: (Math.PI * 2 * i) / 20,
        radius: 15 + Math.random() * 25,
        speed: 0.02 + Math.random() * 0.03,
        size: 2 + Math.random() * 3,
        hue: Math.random() * 60 - 30, // Variation around theme color
      });
    }
    setParticles(initialParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          angle: p.angle + p.speed,
        }))
      );
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Fade out trail nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(t => now - t.timestamp < 500));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Force hide all default cursors
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    // Create global style to override all cursors (if not exists)
    let styleEl = document.getElementById("quantum-cursor-override") as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "quantum-cursor-override";
      styleEl.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create trail nodes
      if (trails.length === 0 ||
          Math.hypot(e.clientX - trails[trails.length - 1]?.x, e.clientY - trails[trails.length - 1]?.y) > 10) {
        setTrails(prev => [
          ...prev.slice(-20),
          { x: e.clientX, y: e.clientY, id: trailIdRef.current++, timestamp: Date.now() }
        ]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      setClickPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setClickPos(null), 800);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      // Cleanup: restore default cursor
      document.body.style.cursor = "auto";
      document.documentElement.style.cursor = "auto";

      // Remove override style
      const styleEl = document.getElementById("quantum-cursor-override");
      if (styleEl) {
        styleEl.remove();
      }

      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, trails]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Neural Network Trail Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {trails.map((trail, i) => {
          if (i === 0) return null;
          const prev = trails[i - 1];
          const age = Date.now() - trail.timestamp;
          const opacity = Math.max(0, 1 - age / 500);
          return (
            <line
              key={trail.id}
              x1={prev.x}
              y1={prev.y}
              x2={trail.x}
              y2={trail.y}
              stroke={`rgba(var(--theme-glow), ${opacity * 0.4})`}
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Main Cursor */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* NORMAL STATE - Quantum Energy Core */}
        <AnimatePresence>
          {!isHovering && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Core Center - WHITE for visibility */}
              <motion.div
                className="absolute w-4 h-4 -left-2 -top-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, #FFFFFF, var(--theme-primary))`,
                  boxShadow: `
                    0 0 10px #FFFFFF,
                    0 0 20px var(--theme-primary),
                    0 0 30px rgba(var(--theme-glow), 0.8),
                    0 0 40px rgba(var(--theme-glow), 0.4)
                  `,
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    `0 0 10px #FFFFFF, 0 0 20px var(--theme-primary), 0 0 30px rgba(var(--theme-glow), 0.8)`,
                    `0 0 15px #FFFFFF, 0 0 30px var(--theme-primary), 0 0 50px rgba(var(--theme-glow), 1)`,
                    `0 0 10px #FFFFFF, 0 0 20px var(--theme-primary), 0 0 30px rgba(var(--theme-glow), 0.8)`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Orbiting Particles (DNA Helix style) - WHITE with theme tint */}
              {particles.map(particle => {
                const x = Math.cos(particle.angle) * particle.radius;
                const y = Math.sin(particle.angle) * particle.radius * 0.4; // Elliptical orbit
                return (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      left: x,
                      top: y,
                      width: particle.size + 1,
                      height: particle.size + 1,
                      background: `radial-gradient(circle, #FFFFFF, var(--theme-primary))`,
                      boxShadow: `
                        0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8),
                        0 0 ${particle.size * 4}px rgba(var(--theme-glow), 0.6)
                      `,
                      border: '0.5px solid rgba(255, 255, 255, 0.3)',
                    }}
                  />
                );
              })}

              {/* Rotating Rings - WHITE with theme accent */}
              <motion.div
                className="absolute w-20 h-20 -left-10 -top-10 rounded-full border-2"
                style={{
                  borderColor: `rgba(255, 255, 255, 0.6)`,
                  borderStyle: "dashed",
                  boxShadow: `0 0 10px rgba(var(--theme-glow), 0.5)`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute w-28 h-28 -left-14 -top-14 rounded-full border-2"
                style={{
                  borderColor: `rgba(255, 255, 255, 0.4)`,
                  boxShadow: `0 0 15px rgba(var(--theme-glow), 0.4)`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Circuit Traces - WHITE with glow */}
              <svg className="absolute -left-16 -top-16 w-32 h-32" viewBox="0 0 128 128">
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.path
                    key={i}
                    d={`M 64 64 L ${64 + Math.cos((angle * Math.PI) / 180) * 40} ${
                      64 + Math.sin((angle * Math.PI) / 180) * 40
                    }`}
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="2"
                    fill="none"
                    style={{
                      filter: `drop-shadow(0 0 3px var(--theme-primary))`,
                    }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </svg>

              {/* Energy Field Distortion */}
              <motion.div
                className="absolute w-20 h-20 -left-10 -top-10 rounded-full"
                style={{
                  background: `radial-gradient(circle, transparent 40%, rgba(var(--theme-glow), 0.1) 70%, transparent)`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* HOVER STATE - Holographic Data Hand */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <svg
                width="60"
                height="70"
                viewBox="0 0 60 70"
                className="absolute -left-4 -top-2"
                style={{
                  filter: `
                    drop-shadow(0 0 4px #FFFFFF)
                    drop-shadow(0 0 8px var(--theme-primary))
                    drop-shadow(0 0 12px rgba(var(--theme-glow), 0.8))
                  `
                }}
              >
                {/* Palm - WHITE with theme glow */}
                <motion.path
                  d="M 20 40 L 20 20 L 40 20 L 40 40 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Fingers - Index - WHITE */}
                <motion.path
                  d="M 22 20 L 22 5"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                />

                {/* Fingers - Middle - WHITE */}
                <motion.path
                  d="M 30 20 L 30 2"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />

                {/* Fingers - Ring - WHITE */}
                <motion.path
                  d="M 38 20 L 38 5"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                />

                {/* Thumb - WHITE */}
                <motion.path
                  d="M 20 35 L 10 30"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />

                {/* Circuit lines in palm - Theme colored */}
                <motion.path
                  d="M 22 25 L 38 25 M 22 30 L 38 30 M 22 35 L 38 35"
                  stroke={`var(--theme-primary)`}
                  strokeWidth="1"
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />

                {/* Finger joints (dots) - WHITE */}
                {[
                  [22, 10],
                  [30, 8],
                  [38, 10],
                  [22, 15],
                  [30, 12],
                  [38, 15],
                ].map(([x, y], i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#FFFFFF"
                    stroke={`var(--theme-primary)`}
                    strokeWidth="0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  />
                ))}

                {/* Holographic scan lines - WHITE */}
                <motion.rect
                  x="18"
                  y="0"
                  width="24"
                  height="2"
                  fill="rgba(255, 255, 255, 0.6)"
                  animate={{ y: [0, 40, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Energy particles around hand - WHITE with theme glow */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const x = 30 + Math.cos(angle) * 25;
                  const y = 25 + Math.sin(angle) * 30;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#FFFFFF"
                      stroke={`var(--theme-primary)`}
                      strokeWidth="0.5"
                      style={{
                        filter: `drop-shadow(0 0 2px var(--theme-primary))`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  );
                })}
              </svg>

              {/* Data stream under hand */}
              <motion.div
                className="absolute -bottom-8 left-0 font-mono text-[6px] opacity-60"
                style={{ color: `var(--theme-primary)` }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {`>INTERACT`}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CLICK STATE - Energy Burst Shockwave */}
        {clickPos && (
          <motion.div
            className="fixed"
            style={{ left: clickPos.x, top: clickPos.y }}
          >
            {/* Multiple expanding rings */}
            {[0, 0.15, 0.3].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  borderColor: `var(--theme-primary)`,
                  left: -20,
                  top: -20,
                }}
                initial={{ width: 40, height: 40, opacity: 1 }}
                animate={{
                  width: 200,
                  height: 200,
                  opacity: 0,
                  left: -100,
                  top: -100,
                }}
                transition={{ duration: 0.8, delay }}
              />
            ))}

            {/* Energy particles burst */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: `var(--theme-primary)` }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * 60,
                    y: Math.sin(angle) * 60,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.6 }}
                />
              );
            })}

            {/* Central flash */}
            <motion.div
              className="absolute w-20 h-20 -left-10 -top-10 rounded-full"
              style={{
                background: `radial-gradient(circle, var(--theme-primary), transparent)`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
