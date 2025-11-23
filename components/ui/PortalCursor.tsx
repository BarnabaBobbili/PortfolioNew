"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PortalCursorProps {
  isActive: boolean;
  mediaUrl?: string;
  isVideo?: boolean;
}

export function PortalCursor({
  isActive,
  mediaUrl,
  isVideo = false,
}: PortalCursorProps) {
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    if (isActive) {
      window.addEventListener("mousemove", moveCursor);
    } else {
      cursorX.set(-500);
      cursorY.set(-500);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isActive, cursorX, cursorY]);

  if (!isActive || !mediaUrl) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
        {isVideo ? (
          <video
            src={mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Project preview"
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      </div>
    </motion.div>
  );
}
