"use client";

import { motion } from "framer-motion";

export function VignetteEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-[96]"
      style={{
        background: `
          radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 40%,
            rgba(0, 10, 30, 0.4) 80%,
            rgba(0, 10, 30, 0.7) 100%
          )
        `,
        boxShadow: `
          inset 0 0 100px rgba(74, 144, 226, 0.1),
          inset 0 0 200px rgba(74, 144, 226, 0.05)
        `,
      }}
    />
  );
}
