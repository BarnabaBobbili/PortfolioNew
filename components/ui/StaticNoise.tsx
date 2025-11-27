"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StaticNoise({ isEnabled = false }: { isEnabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create noise
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        // Random grayscale with blue tint
        const noise = Math.random() * 255;
        const r = noise * 0.8;
        const g = noise * 0.9;
        const b = noise * 1.0;
        const a = 30; // Low opacity

        buffer[i] =
          (a << 24) | // Alpha
          (b << 16) | // Blue
          (g << 8) |  // Green
          r;          // Red
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    const interval = setInterval(createNoise, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isEnabled]);

  return (
    <>
      <AnimatePresence>
        {isEnabled && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[98] mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </>
  );
}
