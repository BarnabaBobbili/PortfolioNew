"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * RandomEffectControl Component
 *
 * Button that triggers random effects:
 * - Random particle direction (towards/away)
 * - Random decipher text
 */

interface RandomEffectControlProps {
  onRandomize: () => void;
}

export function RandomEffectControl({ onRandomize }: RandomEffectControlProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    onRandomize();

    // Reset animation state after effect
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 text-white font-mono font-medium rounded-full hover:border-cyan-400 transition-all backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? { rotate: 360 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={isAnimating ? { rotate: 360 } : {}}
          transition={{ duration: 1, ease: "linear" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </motion.svg>
        <span>RANDOM</span>
      </div>
    </motion.button>
  );
}
