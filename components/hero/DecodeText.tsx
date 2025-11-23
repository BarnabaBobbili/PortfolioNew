"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DecodeTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";
const TECH_CHARS = "01";

export function DecodeText({
  text,
  className = "",
  delay = 0,
  speed = 50,
}: DecodeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const textLength = text.length;
    let resolved = 0;

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        frameRef.current++;

        const newText = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            if (index < resolved) {
              return text[index];
            }

            if (frameRef.current % 3 === 0 && Math.random() < 0.5) {
              return char;
            }

            // Alternate between glitch and tech characters
            const chars = Math.random() > 0.5 ? GLITCH_CHARS : TECH_CHARS;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(newText);

        if (frameRef.current % 2 === 0) {
          resolved++;
        }

        if (resolved >= textLength) {
          setDisplayText(text);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, delay, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {displayText}
    </motion.span>
  );
}
