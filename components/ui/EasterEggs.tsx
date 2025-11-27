"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EasterEggs() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const [konamiIndex, setKonamiIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Code detection
      if (e.key === konamiCode[konamiIndex]) {
        setKonamiIndex(konamiIndex + 1);
        if (konamiIndex + 1 === konamiCode.length) {
          setKonamiActivated(true);
          setSecretMessage("🎮 KONAMI CODE ACTIVATED! You found the secret!");
          setTimeout(() => setSecretMessage(""), 5000);
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <AnimatePresence>
      {secretMessage && (
        <motion.div
          key="secret-message"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-32 left-1/2 -translate-x-1/2 z-[200] bg-purple-500/20 backdrop-blur-md border-2 border-purple-500 rounded-lg px-6 py-4 font-mono text-purple-300"
        >
          {secretMessage}
        </motion.div>
      )}

      {konamiActivated && (
        <motion.div
          key="konami-celebration"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
          className="fixed inset-0 pointer-events-none z-[150] flex items-center justify-center"
        >
          <div className="text-9xl">🎉</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
