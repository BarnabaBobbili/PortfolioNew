"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 pr-2">
      {/* Top bracket */}
      <div className="text-cyan-400/50 font-mono text-xs">[</div>

      {/* Progress bar */}
      <div className="relative h-32 w-1 bg-cyan-900/30">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-400 to-blue-500"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Bottom bracket */}
      <div className="text-cyan-400/50 font-mono text-xs">]</div>

      {/* Percentage */}
      <div className="font-mono text-[8px] text-cyan-400 mt-1">
        {scrollProgress.toFixed(0)}%
      </div>
    </div>
  );
}
