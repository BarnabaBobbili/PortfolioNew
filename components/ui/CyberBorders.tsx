"use client";

import { motion } from "framer-motion";

export function CyberBorders() {
  const BASE_DELAY = 3; // Start after loading screen (3 seconds)

  return (
    <>
      {/* Top left corner */}
      <motion.div
        className="fixed top-0 left-0 z-[95] pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: BASE_DELAY + 1, duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Main corner */}
          <motion.path
            d="M 0 20 L 0 0 L 20 0"
            stroke="rgba(74, 144, 226, 0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.2, duration: 0.8 }}
          />
          {/* Accent line */}
          <motion.path
            d="M 5 30 L 5 5 L 30 5"
            stroke="rgba(74, 144, 226, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.4, duration: 0.8 }}
          />
          {/* Dots */}
          <circle cx="0" cy="0" r="3" fill="rgba(74, 144, 226, 0.8)" />
          <circle cx="20" cy="0" r="2" fill="rgba(74, 144, 226, 0.6)" />
          <circle cx="0" cy="20" r="2" fill="rgba(74, 144, 226, 0.6)" />
        </svg>
      </motion.div>

      {/* Top right corner */}
      <motion.div
        className="fixed top-0 right-0 z-[95] pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: BASE_DELAY + 1, duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M 100 20 L 100 0 L 80 0"
            stroke="rgba(74, 144, 226, 0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.2, duration: 0.8 }}
          />
          <motion.path
            d="M 95 30 L 95 5 L 70 5"
            stroke="rgba(74, 144, 226, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.4, duration: 0.8 }}
          />
          <circle cx="100" cy="0" r="3" fill="rgba(74, 144, 226, 0.8)" />
          <circle cx="80" cy="0" r="2" fill="rgba(74, 144, 226, 0.6)" />
          <circle cx="100" cy="20" r="2" fill="rgba(74, 144, 226, 0.6)" />
        </svg>
      </motion.div>

      {/* Bottom left corner */}
      <motion.div
        className="fixed bottom-0 left-0 z-[95] pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: BASE_DELAY + 1.1, duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M 0 80 L 0 100 L 20 100"
            stroke="rgba(74, 144, 226, 0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.3, duration: 0.8 }}
          />
          <motion.path
            d="M 5 70 L 5 95 L 30 95"
            stroke="rgba(74, 144, 226, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.5, duration: 0.8 }}
          />
          <circle cx="0" cy="100" r="3" fill="rgba(74, 144, 226, 0.8)" />
          <circle cx="20" cy="100" r="2" fill="rgba(74, 144, 226, 0.6)" />
          <circle cx="0" cy="80" r="2" fill="rgba(74, 144, 226, 0.6)" />
        </svg>
      </motion.div>

      {/* Bottom right corner */}
      <motion.div
        className="fixed bottom-0 right-0 z-[95] pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: BASE_DELAY + 1.1, duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M 100 80 L 100 100 L 80 100"
            stroke="rgba(74, 144, 226, 0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.3, duration: 0.8 }}
          />
          <motion.path
            d="M 95 70 L 95 95 L 70 95"
            stroke="rgba(74, 144, 226, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: BASE_DELAY + 1.5, duration: 0.8 }}
          />
          <circle cx="100" cy="100" r="3" fill="rgba(74, 144, 226, 0.8)" />
          <circle cx="80" cy="100" r="2" fill="rgba(74, 144, 226, 0.6)" />
          <circle cx="100" cy="80" r="2" fill="rgba(74, 144, 226, 0.6)" />
        </svg>
      </motion.div>
    </>
  );
}
