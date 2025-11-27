"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor Component
 *
 * Replaces the default system cursor with a custom double-circle design.
 * Uses mix-blend-difference for a unique visual effect that inverts colors.
 *
 * FEATURES:
 * - Two-layer cursor (inner dot + outer ring)
 * - Smooth spring physics for natural movement
 * - Mix-blend-difference mode for color inversion effect
 * - Always visible on top of all content (z-index: 9999)
 *
 * USAGE: Place in main layout or page component (currently in page.tsx)
 */

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values track cursor position (start off-screen)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth, bouncy cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Update cursor position on mouse move
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner cursor dot (smaller, solid) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%", // Center on cursor position
          translateY: "-50%",
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      {/* Outer cursor ring (larger, outline only) */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-white opacity-40" />
      </motion.div>
    </>
  );
}
