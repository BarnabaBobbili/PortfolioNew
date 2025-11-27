"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * RandomDecipherText Component
 *
 * Displays random text that deciphers/glitches into view at random positions
 * Creates a Matrix-style random code rain effect
 */

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";
const TECH_CHARS = "01アイウエオカキクケコサシスセソタチツテト";
const RANDOM_WORDS = [
  "INITIALIZING",
  "DECODING",
  "ANALYZING",
  "PROCESSING",
  "SCANNING",
  "ENCRYPTING",
  "LOADING",
  "CALIBRATING",
  "SYNCHRONIZING",
  "TRANSMITTING",
];

function getRandomChar(): string {
  const chars = Math.random() > 0.5 ? GLITCH_CHARS : TECH_CHARS;
  return chars[Math.floor(Math.random() * chars.length)];
}

interface DecipherTextProps {
  text: string;
  x: number;
  y: number;
  onComplete: () => void;
}

function DecipherText({ text, x, y, onComplete }: DecipherTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDecoded, setIsDecoded] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    const totalFrames = 20 + Math.random() * 10;

    const interval = setInterval(() => {
      frameCount++;

      if (frameCount > totalFrames * 0.7 && Math.random() < 0.3) {
        setDisplayText(text);
      } else if (frameCount < totalFrames) {
        // Generate random text of same length
        setDisplayText(
          Array.from({ length: text.length }, () => getRandomChar()).join("")
        );
      } else {
        setDisplayText(text);
        setIsDecoded(true);
        clearInterval(interval);

        // Remove after display
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed font-mono text-lg pointer-events-none z-[100]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color: isDecoded ? "#00ffff" : "#66aaff",
        textShadow: isDecoded
          ? "0 0 10px #00ffff, 0 0 20px #00ffff"
          : "0 0 5px #66aaff",
      }}
    >
      {displayText}
    </motion.div>
  );
}

interface RandomDecipherTextProps {
  isActive: boolean;
}

export function RandomDecipherText({ isActive }: RandomDecipherTextProps) {
  const [texts, setTexts] = useState<
    Array<{ id: number; text: string; x: number; y: number }>
  >([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Add new random text
      const newText = {
        id: Date.now(),
        text: RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)],
        x: 10 + Math.random() * 80, // 10% to 90% of screen width
        y: 10 + Math.random() * 80, // 10% to 90% of screen height
      };

      setTexts((prev) => [...prev, newText]);

      // Limit to 5 texts on screen at once
      setTexts((prev) => prev.slice(-5));
    }, 800); // Generate new text every 800ms

    return () => clearInterval(interval);
  }, [isActive]);

  const removeText = (id: number) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AnimatePresence>
      {texts.map((item) => (
        <DecipherText
          key={item.id}
          text={item.text}
          x={item.x}
          y={item.y}
          onComplete={() => removeText(item.id)}
        />
      ))}
    </AnimatePresence>
  );
}
