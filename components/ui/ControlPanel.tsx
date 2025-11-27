"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "blue" | "cyan" | "purple" | "green" | "red";

const themes = {
  blue: {
    primary: "#4A90E2",
    secondary: "#2a5f8f",
    light: "#66aaff",
    dark: "#1a4d7a",
    glow: "74, 144, 226",
    name: "BLUE",
    icon: "◆"
  },
  cyan: {
    primary: "#00D9FF",
    secondary: "#00a8cc",
    light: "#33e5ff",
    dark: "#006b80",
    glow: "0, 217, 255",
    name: "CYAN",
    icon: "●"
  },
  purple: {
    primary: "#A855F7",
    secondary: "#7c3aed",
    light: "#c084fc",
    dark: "#5b21b6",
    glow: "168, 85, 247",
    name: "PURPLE",
    icon: "▲"
  },
  green: {
    primary: "#10B981",
    secondary: "#059669",
    light: "#34d399",
    dark: "#047857",
    glow: "16, 185, 129",
    name: "GREEN",
    icon: "■"
  },
  red: {
    primary: "#EF4444",
    secondary: "#dc2626",
    light: "#f87171",
    dark: "#991b1b",
    glow: "239, 68, 68",
    name: "RED",
    icon: "★"
  },
};

export interface ControlPanelSettings {
  staticNoise: boolean;
  particleNetwork: boolean;
  matrixRain: boolean;
  scanlines: boolean;
}

interface ControlPanelProps {
  onSettingsChange?: (settings: ControlPanelSettings) => void;
  onThemeChange?: (theme: Theme) => void;
  currentTheme?: Theme;
}

/**
 * COMPACT CONTROL PANEL
 *
 * Space-efficient FAB (Floating Action Button) that expands to show:
 * - Theme switcher
 * - Visual effects toggles (Static, Network, Matrix, Scanlines)
 * - Future controls/settings
 *
 * Design: Minimal footprint when closed, full access when open
 */
export function ControlPanel({ onSettingsChange, onThemeChange, currentTheme: externalTheme }: ControlPanelProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(externalTheme || "blue");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "effects">("theme");

  // Sync with external theme changes
  useEffect(() => {
    if (externalTheme && externalTheme !== currentTheme) {
      setCurrentTheme(externalTheme);
    }
  }, [externalTheme]);

  // Effects state
  const [effects, setEffects] = useState<ControlPanelSettings>({
    staticNoise: false,
    particleNetwork: false,
    matrixRain: false,
    scanlines: false,
  });

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

  // Notify parent of effects changes
  useEffect(() => {
    if (onSettingsChange) {
      onSettingsChange(effects);
    }
  }, [effects, onSettingsChange]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  const toggleEffect = (effect: keyof ControlPanelSettings) => {
    setEffects(prev => ({
      ...prev,
      [effect]: !prev[effect]
    }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Expanded Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-xl border rounded-lg overflow-hidden min-w-[220px]"
            style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.3)` }}
          >
            {/* Header with tabs */}
            <div className="border-b p-3"
              style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.2)` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-gray-400">CONTROLS</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white text-[10px] transition-colors"
                >
                  [X]
                </button>
              </div>

              {/* Tab buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab("theme")}
                  className={`flex-1 px-2 py-1 font-mono text-[9px] rounded transition-all ${
                    activeTab === "theme"
                      ? "bg-white/10 text-white border"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  style={activeTab === "theme" ? { borderColor: `rgba(${themes[currentTheme].glow}, 0.3)` } : {}}
                >
                  THEME
                </button>
                <button
                  onClick={() => setActiveTab("effects")}
                  className={`flex-1 px-2 py-1 font-mono text-[9px] rounded transition-all ${
                    activeTab === "effects"
                      ? "bg-white/10 text-white border"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  style={activeTab === "effects" ? { borderColor: `rgba(${themes[currentTheme].glow}, 0.3)` } : {}}
                >
                  EFFECTS
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="p-3">
              <AnimatePresence mode="wait">
                {activeTab === "theme" && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-2"
                  >
                    {(Object.keys(themes) as Theme[]).map((theme) => (
                      <motion.button
                        key={theme}
                        onClick={() => handleThemeChange(theme)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded transition-all ${
                          currentTheme === theme
                            ? "bg-white/10 border border-white/20"
                            : "border border-transparent hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border-2"
                            style={{
                              backgroundColor: themes[theme].primary,
                              borderColor: currentTheme === theme ? "#fff" : "transparent",
                            }}
                          />
                          <span className="font-mono text-xs" style={{ color: themes[theme].primary }}>
                            {themes[theme].name}
                          </span>
                        </div>
                        {currentTheme === theme && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-xs"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {activeTab === "effects" && (
                  <motion.div
                    key="effects"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    {/* Scanlines */}
                    <motion.button
                      onClick={() => toggleEffect("scanlines")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded border border-transparent hover:bg-white/5 transition-all"
                    >
                      <span className="font-mono text-xs text-gray-300">SCANLINES</span>
                      <div
                        className={`w-10 h-5 rounded-full border transition-all ${
                          effects.scanlines ? "bg-white/20" : "bg-white/5"
                        }`}
                        style={{ borderColor: effects.scanlines ? themes[currentTheme].primary : "rgba(255,255,255,0.2)" }}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full mt-0.5"
                          style={{ backgroundColor: effects.scanlines ? themes[currentTheme].primary : "#666" }}
                          animate={{ x: effects.scanlines ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </motion.button>

                    {/* Matrix Rain */}
                    <motion.button
                      onClick={() => toggleEffect("matrixRain")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded border border-transparent hover:bg-white/5 transition-all"
                    >
                      <span className="font-mono text-xs text-gray-300">MATRIX</span>
                      <div
                        className={`w-10 h-5 rounded-full border transition-all ${
                          effects.matrixRain ? "bg-white/20" : "bg-white/5"
                        }`}
                        style={{ borderColor: effects.matrixRain ? "#10B981" : "rgba(255,255,255,0.2)" }}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full mt-0.5"
                          style={{ backgroundColor: effects.matrixRain ? "#10B981" : "#666" }}
                          animate={{ x: effects.matrixRain ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </motion.button>

                    {/* Particle Network */}
                    <motion.button
                      onClick={() => toggleEffect("particleNetwork")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded border border-transparent hover:bg-white/5 transition-all"
                    >
                      <span className="font-mono text-xs text-gray-300">NETWORK</span>
                      <div
                        className={`w-10 h-5 rounded-full border transition-all ${
                          effects.particleNetwork ? "bg-white/20" : "bg-white/5"
                        }`}
                        style={{ borderColor: effects.particleNetwork ? themes[currentTheme].primary : "rgba(255,255,255,0.2)" }}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full mt-0.5"
                          style={{ backgroundColor: effects.particleNetwork ? themes[currentTheme].primary : "#666" }}
                          animate={{ x: effects.particleNetwork ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </motion.button>

                    {/* Static Noise */}
                    <motion.button
                      onClick={() => toggleEffect("staticNoise")}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded border border-transparent hover:bg-white/5 transition-all"
                    >
                      <span className="font-mono text-xs text-gray-300">STATIC</span>
                      <div
                        className={`w-10 h-5 rounded-full border transition-all ${
                          effects.staticNoise ? "bg-white/20" : "bg-white/5"
                        }`}
                        style={{ borderColor: effects.staticNoise ? themes[currentTheme].primary : "rgba(255,255,255,0.2)" }}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full mt-0.5"
                          style={{ backgroundColor: effects.staticNoise ? themes[currentTheme].primary : "#666" }}
                          animate={{ x: effects.staticNoise ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2"
              style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.5)` }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2"
              style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.5)` }}
            />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2"
              style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.5)` }}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2"
              style={{ borderColor: `rgba(${themes[currentTheme].glow}, 0.5)` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border-2 flex items-center justify-center overflow-hidden group"
        style={{
          borderColor: `rgba(${themes[currentTheme].glow}, 0.5)`,
        }}
      >
        {/* Rotating background gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `conic-gradient(from 0deg, ${themes[currentTheme].primary}, ${themes[currentTheme].light}, ${themes[currentTheme].primary})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 font-mono text-lg"
          style={{ color: themes[currentTheme].primary }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {isOpen ? "×" : themes[currentTheme].icon}
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${themes[currentTheme].glow}, 0.4) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 20px rgba(${themes[currentTheme].glow}, 0.6)`,
          }}
        />
      </motion.button>
    </div>
  );
}
