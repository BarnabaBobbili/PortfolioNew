"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * PortalCursor Component
 *
 * A specialized cursor component that displays a circular preview portal following the mouse.
 * Shows image or video content inside a rounded frame when hovering over interactive elements.
 *
 * USE CASE: Intended for project galleries where hovering shows a preview of the work
 * STATUS: Not currently in use - available for future implementation
 *
 * @param isActive - Controls visibility of the portal cursor
 * @param mediaUrl - URL of the image or video to display in the portal
 * @param isVideo - Whether the media is a video (true) or image (false)
 */

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
  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-500); // Start off-screen
  const cursorY = useMotionValue(-500);

  // Spring physics for smooth, natural cursor movement
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Update cursor position to follow mouse
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    if (isActive) {
      // Track mouse movement when portal is active
      window.addEventListener("mousemove", moveCursor);
    } else {
      // Move portal off-screen when inactive
      cursorX.set(-500);
      cursorY.set(-500);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isActive, cursorX, cursorY]);

  // Don't render if not active or no media provided
  if (!isActive || !mediaUrl) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%", // Center horizontally on cursor
        translateY: "-50%", // Center vertically on cursor
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Circular portal frame with preview content */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
        {/* Conditionally render video or image based on media type */}
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

        {/* Subtle radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      </div>
    </motion.div>
  );
}
