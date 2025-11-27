"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * QUANTUM SIGIL LOGO - BB
 *
 * THE MOST EXCLUSIVE LOGO EVER CREATED
 * Born exclusively for Barnaba Bobbili's portfolio
 *
 * UNIQUE FEATURES:
 * - Bold geometric "BB" letters with quantum glow
 * - Hexagonal quantum cores inside each letter
 * - Energy flow connection between letters
 * - Rotating orbital rings
 * - Electromagnetic field particles on hover
 * - Circuit trace pathways
 * - Holographic shimmer effect
 * - Sacred geometry integration
 * - Pulsing quantum cores
 * - Interactive state transformations
 */

export function QuantumLogo({
  size = 60,
  animated = true,
  interactive = true
}: {
  size?: number;
  animated?: boolean;
  interactive?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 60"
        className="relative z-10"
      >
        {/* Energy flow connection between letters */}
        <motion.path
          d="M 28 30 Q 50 20, 72 30"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          animate={{
            strokeDashoffset: [0, -20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Left B - BOLD AND CLEAR */}
        {/* Vertical spine */}
        <motion.rect
          x="10"
          y="10"
          width="3"
          height="40"
          fill="#FFFFFF"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            transformOrigin: "11.5px 30px",
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />
        {/* Top bump */}
        <motion.path
          d="M 13 10 L 26 10 C 30 10, 33 13, 33 18 C 33 23, 30 26, 26 26 L 13 26 Z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />
        {/* Bottom bump */}
        <motion.path
          d="M 13 30 L 28 30 C 32 30, 35 33, 35 38 C 35 43, 32 46, 28 46 L 13 46 Z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />

        {/* Right B - BOLD AND CLEAR */}
        {/* Vertical spine */}
        <motion.rect
          x="65"
          y="10"
          width="3"
          height="40"
          fill="#FFFFFF"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            transformOrigin: "66.5px 30px",
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />
        {/* Top bump */}
        <motion.path
          d="M 68 10 L 81 10 C 85 10, 88 13, 88 18 C 88 23, 85 26, 81 26 L 68 26 Z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />
        {/* Bottom bump */}
        <motion.path
          d="M 68 30 L 83 30 C 87 30, 90 33, 90 38 C 90 43, 87 46, 83 46 L 68 46 Z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            filter: `drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 8px rgba(var(--theme-glow), 0.5))`,
          }}
        />

        {/* Hexagonal quantum cores */}
        <motion.path
          d="M 18 28 L 22 26 L 26 28 L 26 32 L 22 34 L 18 32 Z"
          fill="none"
          stroke="var(--theme-primary)"
          strokeWidth="1"
          opacity="0.6"
          animate={{
            strokeDasharray: ["0 50", "50 0"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M 73 28 L 77 26 L 81 28 L 81 32 L 77 34 L 73 32 Z"
          fill="none"
          stroke="var(--theme-primary)"
          strokeWidth="1"
          opacity="0.6"
          animate={{
            strokeDasharray: ["0 50", "50 0"],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />

        {/* Pulsing quantum cores */}
        <motion.circle
          cx="22"
          cy="30"
          r="2"
          fill="var(--theme-primary)"
          animate={{
            r: [1.5, 2.5, 1.5],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            filter: `drop-shadow(0 0 6px var(--theme-primary))`,
          }}
        />
        <motion.circle
          cx="77"
          cy="30"
          r="2"
          fill="var(--theme-primary)"
          animate={{
            r: [1.5, 2.5, 1.5],
            opacity: [1, 0.8, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          style={{
            filter: `drop-shadow(0 0 6px var(--theme-primary))`,
          }}
        />

        {/* Sacred geometry orbital rings */}
        <motion.circle
          cx="22"
          cy="30"
          r="12"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.5"
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "22px 30px" }}
        />
        <motion.circle
          cx="77"
          cy="30"
          r="12"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.5"
          animate={{
            rotate: -360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "77px 30px" }}
        />

        {/* Hover: Rotating energy rings */}
        {isHovered && (
          <>
            <motion.circle
              cx="22"
              cy="30"
              r="18"
              fill="none"
              stroke="var(--theme-primary)"
              strokeWidth="0.8"
              strokeDasharray="6 6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.6,
                rotate: 360
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 }
              }}
              style={{ transformOrigin: "22px 30px" }}
            />
            <motion.circle
              cx="77"
              cy="30"
              r="18"
              fill="none"
              stroke="var(--theme-primary)"
              strokeWidth="0.8"
              strokeDasharray="6 6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.6,
                rotate: -360
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 }
              }}
              style={{ transformOrigin: "77px 30px" }}
            />
          </>
        )}

        {/* Hover: Electromagnetic field particles */}
        {isHovered && [...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const cx = 50 + Math.cos(angle) * 35;
          const cy = 30 + Math.sin(angle) * 25;
          return (
            <motion.circle
              key={`field-${i}`}
              cx={cx}
              cy={cy}
              r="0.8"
              fill="var(--theme-primary)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.08,
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* Circuit trace pathways */}
        <motion.path
          d="M 0 30 L 10 30"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 90 30 L 100 30"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>

      {/* Holographic shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)`,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Outer glow on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle, rgba(var(--theme-glow), 0.4) 0%, transparent 70%)`,
            filter: "blur(15px)",
          }}
        />
      )}
    </div>
  );
}
