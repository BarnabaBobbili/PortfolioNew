"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Theme = "blue" | "cyan" | "purple" | "green" | "red";

const themes = {
  blue: {
    primary: "#4A90E2",
    secondary: "#2a5f8f",
    light: "#66aaff",
    dark: "#1a4d7a",
    glow: "74, 144, 226",
    name: "BLUE"
  },
  cyan: {
    primary: "#00D9FF",
    secondary: "#00a8cc",
    light: "#33e5ff",
    dark: "#006b80",
    glow: "0, 217, 255",
    name: "CYAN"
  },
  purple: {
    primary: "#A855F7",
    secondary: "#7c3aed",
    light: "#c084fc",
    dark: "#5b21b6",
    glow: "168, 85, 247",
    name: "PURPLE"
  },
  green: {
    primary: "#10B981",
    secondary: "#059669",
    light: "#34d399",
    dark: "#047857",
    glow: "16, 185, 129",
    name: "GREEN"
  },
  red: {
    primary: "#EF4444",
    secondary: "#dc2626",
    light: "#f87171",
    dark: "#991b1b",
    glow: "239, 68, 68",
    name: "RED"
  },
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("blue");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Set CSS custom properties
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-secondary", theme.secondary);
    root.style.setProperty("--theme-light", theme.light);
    root.style.setProperty("--theme-dark", theme.dark);
    root.style.setProperty("--theme-glow", theme.glow);

    // Update data attribute for Tailwind
    root.setAttribute("data-theme", currentTheme);

    // Create dynamic style overrides
    let styleEl = document.getElementById("theme-overrides");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "theme-overrides";
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      /* Override cyan colors with theme colors */
      .text-cyan-400 { color: ${theme.primary} !important; }
      .text-cyan-300 { color: ${theme.light} !important; }
      .text-blue-400 { color: ${theme.primary} !important; }
      .text-blue-500 { color: ${theme.secondary} !important; }

      .border-cyan-400, .border-cyan-500 { border-color: ${theme.primary} !important; }
      .border-cyan-500\\/30 { border-color: rgba(${theme.glow}, 0.3) !important; }
      .border-cyan-500\\/20 { border-color: rgba(${theme.glow}, 0.2) !important; }
      .border-cyan-400\\/50 { border-color: rgba(${theme.glow}, 0.5) !important; }

      .bg-cyan-400 { background-color: ${theme.primary} !important; }
      .bg-cyan-500 { background-color: ${theme.primary} !important; }
      .bg-cyan-900\\/20 { background-color: rgba(${theme.glow}, 0.2) !important; }
      .bg-cyan-900\\/30 { background-color: rgba(${theme.glow}, 0.3) !important; }

      .from-cyan-400 { --tw-gradient-from: ${theme.primary} !important; }
      .to-cyan-400 { --tw-gradient-to: ${theme.primary} !important; }
      .via-cyan-400 { --tw-gradient-via: ${theme.primary} !important; }
      .from-blue-500 { --tw-gradient-from: ${theme.secondary} !important; }
      .to-blue-500 { --tw-gradient-to: ${theme.secondary} !important; }

      .shadow-cyan-500\\/20 { --tw-shadow-color: rgba(${theme.glow}, 0.2) !important; }

      /* Hover states */
      .hover\\:text-cyan-400:hover { color: ${theme.primary} !important; }
      .hover\\:bg-cyan-500\\/10:hover { background-color: rgba(${theme.glow}, 0.1) !important; }
      .hover\\:border-cyan-500\\/60:hover { border-color: rgba(${theme.glow}, 0.6) !important; }
    `;
  }, [currentTheme]);

  return (
    <div className="fixed bottom-16 right-4 z-[100]">
      {/* Theme selector */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 bg-black/40 backdrop-blur-md border rounded px-2 py-2 flex gap-2"
          style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.3)` }}
        >
          {(Object.keys(themes) as Theme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setCurrentTheme(theme);
                setIsOpen(false);
              }}
              className="w-6 h-6 rounded border-2 hover:scale-110 transition-transform"
              style={{
                backgroundColor: themes[theme].primary,
                borderColor: currentTheme === theme ? "#fff" : "transparent",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/40 backdrop-blur-md border rounded px-3 py-1.5 font-mono text-[10px] hover:bg-opacity-20 transition-colors select-none"
        style={{
          borderColor: `rgba(${themes[currentTheme].glow}, 0.3)`,
          color: themes[currentTheme].primary,
          backgroundColor: `rgba(${themes[currentTheme].glow}, 0.05)`
        }}
      >
        [THEME: {themes[currentTheme].name}]
      </button>
    </div>
  );
}
