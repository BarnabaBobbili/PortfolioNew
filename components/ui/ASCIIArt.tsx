"use client";

import { motion } from "framer-motion";

interface ASCIIArtProps {
  variant?: "logo" | "corner" | "divider";
  className?: string;
}

const asciiArt = {
  logo: `
 ____  ____
||B ||||B ||
||__||||__||
|/__\\||/__\\|
  `,
  corner: `
┏━━━━━━━━━━━━━┓
┃             ┃
┃  [SYSTEM]   ┃
┃   ACTIVE    ┃
┃             ┃
┗━━━━━━━━━━━━━┛
  `,
  divider: `
╔═══════════════════════════════════════════════════════════╗
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
╚═══════════════════════════════════════════════════════════╝
  `,
};

export function ASCIIArt({ variant = "logo", className = "" }: ASCIIArtProps) {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`font-mono text-cyan-400 text-xs sm:text-sm leading-tight ${className}`}
    >
      {asciiArt[variant]}
    </motion.pre>
  );
}
