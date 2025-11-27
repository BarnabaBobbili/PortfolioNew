"use client";

import { useEffect, useRef } from "react";

export function BinaryMargin() {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;

    const leftCtx = leftCanvas.getContext("2d");
    const rightCtx = rightCanvas.getContext("2d");
    if (!leftCtx || !rightCtx) return;

    // Set canvas sizes
    const setCanvasSize = () => {
      const width = 40;
      const height = window.innerHeight;

      leftCanvas.width = width;
      leftCanvas.height = height;
      rightCanvas.width = width;
      rightCanvas.height = height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Binary and hex characters
    const binaryChars = ["0", "1"];
    const hexChars = "0123456789ABCDEF".split("");

    // Animation state
    let leftOffset = 0;
    let rightOffset = 0;

    // Draw function
    const draw = () => {
      // Clear with fade effect
      leftCtx.fillStyle = "rgba(10, 10, 15, 0.1)";
      leftCtx.fillRect(0, 0, leftCanvas.width, leftCanvas.height);
      rightCtx.fillStyle = "rgba(10, 10, 15, 0.1)";
      rightCtx.fillRect(0, 0, rightCanvas.width, rightCanvas.height);

      // Font settings
      const fontSize = 10;
      leftCtx.font = `${fontSize}px monospace`;
      rightCtx.font = `${fontSize}px monospace`;

      // Left side - Binary
      leftCtx.fillStyle = "rgba(74, 144, 226, 0.3)";
      for (let y = -leftOffset; y < leftCanvas.height + fontSize; y += fontSize * 2) {
        const binary = Array.from({ length: 8 }, () =>
          binaryChars[Math.floor(Math.random() * 2)]
        ).join("");
        leftCtx.fillText(binary.substring(0, 4), 2, y);
      }

      // Right side - Hex
      rightCtx.fillStyle = "rgba(74, 144, 226, 0.3)";
      for (let y = -rightOffset; y < rightCanvas.height + fontSize; y += fontSize * 2) {
        const hex = "0x" + Array.from({ length: 2 }, () =>
          hexChars[Math.floor(Math.random() * 16)]
        ).join("");
        rightCtx.fillText(hex, 2, y);
      }

      // Update offsets for scrolling
      leftOffset = (leftOffset + 0.5) % (fontSize * 2);
      rightOffset = (rightOffset + 0.3) % (fontSize * 2);
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* Left margin */}
      <canvas
        ref={leftCanvasRef}
        className="fixed left-0 top-0 pointer-events-none z-[5] opacity-40"
      />

      {/* Right margin */}
      <canvas
        ref={rightCanvasRef}
        className="fixed right-0 top-0 pointer-events-none z-[5] opacity-40"
      />
    </>
  );
}
