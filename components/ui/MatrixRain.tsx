"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MatrixRain({ isEnabled = false }: { isEnabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - Katakana + Latin + Numbers
    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array to track Y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random heights
    }

    // Draw function
    const draw = () => {
      // Black background with transparency for trail effect (less fade for stronger trails)
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Get theme color
        const themeGlow = getComputedStyle(document.documentElement)
          .getPropertyValue('--theme-glow')
          .trim() || '74, 144, 226';

        // Brighter and more opaque characters
        const lightness = 60 + Math.random() * 40;
        ctx.fillStyle = `rgba(${themeGlow}, ${lightness / 100})`;

        // Draw character with glow effect
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add shadow/glow for stronger effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${themeGlow}, 0.8)`;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset drop when it goes off screen
        // Add randomness to create varying lengths
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Animation loop (faster for more intensity)
    const interval = setInterval(draw, 40);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isEnabled]);

  return (
    <>
      <AnimatePresence>
        {isEnabled && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-[4]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
