"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { color: "#4A90E2", name: "BLUE", glow: "74, 144, 226" },
  { color: "#00D9FF", name: "CYAN", glow: "0, 217, 255" },
  { color: "#A855F7", name: "PURPLE", glow: "168, 85, 247" },
  { color: "#10B981", name: "GREEN", glow: "16, 185, 129" },
  { color: "#EF4444", name: "RED", glow: "239, 68, 68" },
];

export function LoadingSequence() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);

  const messages = [
    "> INITIALIZING NEURAL INTERFACE...",
    "> LOADING THEME MATRIX...",
    "> ESTABLISHING CONNECTION...",
    "> RENDERING 3D ENVIRONMENT...",
    "> WELCOME TO THE MATRIX",
  ];

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Message updates
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Theme cycling - cycle through all 5 themes during loading
    const themeInterval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 600);

    // Complete loading after progress reaches 100%
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(themeInterval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const activeTheme = themes[currentTheme];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center"
        >
          <div className="max-w-2xl w-full px-8">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
                [SYSTEM BOOT]
              </h1>
              <motion.p
                className="font-mono text-sm"
                animate={{ color: activeTheme.color }}
                transition={{ duration: 0.3 }}
              >
                v2.4.1 - Neural Interface Protocol [{activeTheme.name}]
              </motion.p>
            </motion.div>

            {/* Messages */}
            <div className="space-y-2 mb-8 h-32">
              {messages.slice(0, currentMessage + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    color: index === currentMessage ? activeTheme.color : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm"
                >
                  {message}
                  {index === currentMessage && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative">
              {/* Bar container */}
              <motion.div
                className="relative h-2 rounded-full overflow-hidden border"
                animate={{
                  backgroundColor: `rgba(${activeTheme.glow}, 0.3)`,
                  borderColor: `rgba(${activeTheme.glow}, 0.3)`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: `linear-gradient(to right, ${activeTheme.color}, ${activeTheme.color}dd)`,
                    boxShadow: `0 0 10px rgba(${activeTheme.glow}, 0.5)`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />

                {/* Animated scanning line */}
                <motion.div
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{
                    x: ["-100%", "400%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Percentage */}
              <motion.div
                className="flex justify-between mt-2 font-mono text-xs"
                animate={{ color: activeTheme.color }}
                transition={{ duration: 0.3 }}
              >
                <span>[{progress.toFixed(0)}%]</span>
                <span>
                  {progress < 100 ? "LOADING..." : "COMPLETE"}
                </span>
              </motion.div>
            </div>

            {/* Corner brackets - Animated with theme colors */}
            <motion.div
              className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2"
              animate={{ borderColor: `rgba(${activeTheme.glow}, 0.3)` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2"
              animate={{ borderColor: `rgba(${activeTheme.glow}, 0.3)` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2"
              animate={{ borderColor: `rgba(${activeTheme.glow}, 0.3)` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2"
              animate={{ borderColor: `rgba(${activeTheme.glow}, 0.3)` }}
              transition={{ duration: 0.3 }}
            />

            {/* Theme Color Indicators - Show all 5 themes */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.name}
                  className="relative"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: index === currentTheme ? theme.color : "transparent",
                      borderColor: theme.color,
                    }}
                    animate={{
                      scale: index === currentTheme ? [1, 1.3, 1] : 1,
                      boxShadow: index === currentTheme
                        ? [
                            `0 0 0px rgba(${theme.glow}, 0)`,
                            `0 0 15px rgba(${theme.glow}, 0.8)`,
                            `0 0 0px rgba(${theme.glow}, 0)`,
                          ]
                        : `0 0 0px rgba(${theme.glow}, 0)`,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: index === currentTheme ? Infinity : 0,
                    }}
                  />
                  {index === currentTheme && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border"
                      style={{ borderColor: theme.color }}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
