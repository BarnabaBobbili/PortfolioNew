"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "error" | "success" | "info" | "warning";
  content: string;
  isTyping?: boolean;
}

type Theme = "blue" | "cyan" | "purple" | "green" | "red";

interface ControlPanelSettings {
  staticNoise: boolean;
  particleNetwork: boolean;
  matrixRain: boolean;
  scanlines: boolean;
}

interface TerminalProps {
  onThemeChange?: (theme: Theme) => void;
  onEffectsChange?: (effects: ControlPanelSettings) => void;
  currentEffects?: ControlPanelSettings;
  currentTheme?: Theme;
}

// Simulated filesystem
const filesystem = {
  "/home/barnaba": {
    "about.txt": "M.Tech student at Amrita Vishwa Vidhyapeetam | Full-stack developer passionate about secure systems and web technologies",
    "skills.txt": "Python, Java, C++, React, Next.js, Node.js, Flask, MongoDB, MySQL, AWS, Azure, Docker, Three.js, WebGL",
    "contact.txt": "Email: barnababobbili098@gmail.com\nGitHub: github.com/BarnabaBobbili\nPhone: 9384617156\nLocation: Chennai",
    "projects": {
      "canteen-delight.md": "Full-stack canteen management system - MERN Stack",
      "personal-blog.md": "Next.js 15 blog with Supabase backend",
      "sentinel-auth.md": "Zero Trust biometric authentication platform",
      "secure-file-system.md": "Multi-modal security integration (IEEE Published)"
    }
  }
};

export function Terminal({
  onThemeChange,
  onEffectsChange,
  currentEffects = { staticNoise: false, particleNetwork: false, matrixRain: false, scanlines: false },
  currentTheme = "blue"
}: TerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Arch Linux 6.6.1-arch1-1 (tty1)", isTyping: false },
    { type: "output", content: "", isTyping: false },
    { type: "output", content: "barnaba-portfolio login: barnaba", isTyping: false },
    { type: "output", content: "Password: ", isTyping: false },
    { type: "success", content: "Last login: " + new Date().toLocaleString(), isTyping: false },
    { type: "output", content: "", isTyping: false },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("/home/barnaba");
  const [isTypingInProgress, setIsTypingInProgress] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Toggle terminal with backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Typewriter effect
  const typewriterEffect = async (lines: TerminalLine[], callback: (lines: TerminalLine[]) => void) => {
    setIsTypingInProgress(true);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const chars = line.content.split('');
      let typedContent = '';

      for (let j = 0; j < chars.length; j++) {
        typedContent += chars[j];
        const tempLines = [...lines.slice(0, i), { ...line, content: typedContent }, ...lines.slice(i + 1)];
        callback(tempLines);
        await new Promise(resolve => setTimeout(resolve, 1)); // 1ms per character for very fast typing
      }
    }

    setIsTypingInProgress(false);
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  // Process command
  const processCommand = async (cmd: string) => {
    if (isTypingInProgress) return; // Don't process if typewriter is active

    const trimmed = cmd.trim();
    const parts = trimmed.split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    // Show command in history immediately
    const commandLine: TerminalLine = {
      type: "command",
      content: `[barnaba@portfolio ${currentDir.replace('/home/barnaba', '~')}]$ ${cmd}`,
      isTyping: false
    };

    setHistory(prev => [...prev, commandLine]);

    // Prepare output lines
    let outputLines: TerminalLine[] = [];

    switch (command) {
      case "help":
        outputLines.push(
          { type: "info", content: "" },
          { type: "info", content: "═══════════════════════ AVAILABLE COMMANDS ═══════════════════════" },
          { type: "output", content: "" },
          { type: "success", content: "FILESYSTEM:" },
          { type: "output", content: "  ls [path]       - List directory contents" },
          { type: "output", content: "  cd <path>       - Change directory" },
          { type: "output", content: "  pwd             - Print working directory" },
          { type: "output", content: "  cat <file>      - Display file contents" },
          { type: "output", content: "" },
          { type: "success", content: "NAVIGATION:" },
          { type: "output", content: "  /about          - Navigate to About section" },
          { type: "output", content: "  /work           - Navigate to Work section" },
          { type: "output", content: "  /skills         - Navigate to Skills section" },
          { type: "output", content: "  /publications   - Navigate to Publications" },
          { type: "output", content: "  /education      - Navigate to Education" },
          { type: "output", content: "  /certifications - Navigate to Certifications" },
          { type: "output", content: "  /contact        - Navigate to Contact section" },
          { type: "output", content: "" },
          { type: "success", content: "THEMING:" },
          { type: "output", content: "  theme <color>   - Change theme (blue|cyan|purple|green|red)" },
          { type: "output", content: "" },
          { type: "success", content: "VISUAL EFFECTS:" },
          { type: "output", content: "  scanlines [on|off|toggle] - CRT scanline overlay" },
          { type: "output", content: "  matrix [on|off|toggle]    - Matrix rain effect" },
          { type: "output", content: "  network [on|off|toggle]   - Particle network" },
          { type: "output", content: "  static [on|off|toggle]    - Static noise overlay" },
          { type: "output", content: "" },
          { type: "success", content: "SYSTEM:" },
          { type: "output", content: "  neofetch        - Display system information" },
          { type: "output", content: "  status          - Show current settings" },
          { type: "output", content: "  clear           - Clear terminal history" },
          { type: "output", content: "  exit            - Close terminal" },
          { type: "output", content: "" },
          { type: "info", content: "══════════════════════════════════════════════════════════════════" },
          { type: "output", content: "" }
        );
        break;

      case "neofetch":
        outputLines.push(
          { type: "output", content: "" },
          { type: "info", content: "        ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ " },
          { type: "info", content: "        ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗" },
          { type: "info", content: "        ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║" },
          { type: "info", content: "        ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║" },
          { type: "info", content: "        ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝" },
          { type: "info", content: "        ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ " },
          { type: "output", content: "" },
          { type: "success", content: "barnaba@portfolio" },
          { type: "output", content: "─────────────────" },
          { type: "output", content: `OS: Portfolio Linux x86_64` },
          { type: "output", content: `Host: Barnaba Bobbili` },
          { type: "output", content: `Education: M.Tech CSE @ Amrita Vishwa Vidhyapeetam` },
          { type: "output", content: `Location: Chennai, India` },
          { type: "output", content: `Kernel: Next.js 16.0.3` },
          { type: "output", content: `Uptime: ${Math.floor(performance.now() / 1000)}s` },
          { type: "output", content: `Shell: arch-terminal 1.0.0` },
          { type: "output", content: `Theme: ${currentTheme}` },
          { type: "output", content: `CPU: React 19 @ 60fps` },
          { type: "output", content: `GPU: Three.js WebGL Renderer` },
          { type: "output", content: `Memory: Optimized` },
          { type: "output", content: "" },
          { type: "success", content: "Tech Stack:" },
          { type: "output", content: `  Languages: Python, Java, C++, JavaScript, TypeScript` },
          { type: "output", content: `  Frontend:  React, Next.js, Three.js, WebGL` },
          { type: "output", content: `  Backend:   Node.js, Flask, MongoDB, MySQL` },
          { type: "output", content: `  Cloud:     AWS, Azure, Docker` },
          { type: "output", content: "" },
          { type: "success", content: "Active Effects:" },
          { type: "output", content: `  Scanlines: ${currentEffects.scanlines ? '✓ ON' : '✗ OFF'}` },
          { type: "output", content: `  Matrix:    ${currentEffects.matrixRain ? '✓ ON' : '✗ OFF'}` },
          { type: "output", content: `  Network:   ${currentEffects.particleNetwork ? '✓ ON' : '✗ OFF'}` },
          { type: "output", content: `  Static:    ${currentEffects.staticNoise ? '✓ ON' : '✗ OFF'}` },
          { type: "output", content: "" }
        );
        break;

      case "status":
        outputLines.push(
          { type: "output", content: "" },
          { type: "success", content: "═══ CURRENT SETTINGS ═══" },
          { type: "output", content: "" },
          { type: "info", content: `Theme:     ${currentTheme.toUpperCase()}` },
          { type: "output", content: "" },
          { type: "info", content: "Visual Effects:" },
          { type: "output", content: `  • Scanlines:       ${currentEffects.scanlines ? '✓ ENABLED' : '✗ DISABLED'}` },
          { type: "output", content: `  • Matrix Rain:     ${currentEffects.matrixRain ? '✓ ENABLED' : '✗ DISABLED'}` },
          { type: "output", content: `  • Particle Network: ${currentEffects.particleNetwork ? '✓ ENABLED' : '✗ DISABLED'}` },
          { type: "output", content: `  • Static Noise:    ${currentEffects.staticNoise ? '✓ ENABLED' : '✗ DISABLED'}` },
          { type: "output", content: "" }
        );
        break;

      case "theme":
        if (args.length === 0) {
          outputLines.push(
            { type: "error", content: "Usage: theme <color>" },
            { type: "output", content: "Available themes: blue, cyan, purple, green, red" },
            { type: "output", content: `Current theme: ${currentTheme}` }
          );
        } else {
          const color = args[0].toLowerCase();
          if (["blue", "cyan", "purple", "green", "red"].includes(color)) {
            outputLines.push({ type: "success", content: `✓ Theme changed to ${color.toUpperCase()}` });
            if (onThemeChange) {
              onThemeChange(color as Theme);
            }
          } else {
            outputLines.push({
              type: "error",
              content: `Invalid theme '${color}'. Available: blue, cyan, purple, green, red`
            });
          }
        }
        break;

      case "scanlines":
        if (args.length === 0 || args[0].toLowerCase() === "toggle") {
          const newValue = !currentEffects.scanlines;
          outputLines.push({
            type: "success",
            content: `✓ Scanlines ${newValue ? 'ENABLED' : 'DISABLED'}`
          });
          if (onEffectsChange) {
            onEffectsChange({ ...currentEffects, scanlines: newValue });
          }
        } else {
          const action = args[0].toLowerCase();
          if (action === "on") {
            outputLines.push({ type: "success", content: "✓ Scanlines ENABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, scanlines: true });
            }
          } else if (action === "off") {
            outputLines.push({ type: "success", content: "✓ Scanlines DISABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, scanlines: false });
            }
          } else {
            outputLines.push({ type: "error", content: "Usage: scanlines [on|off|toggle]" });
          }
        }
        break;

      case "matrix":
        if (args.length === 0 || args[0].toLowerCase() === "toggle") {
          const newValue = !currentEffects.matrixRain;
          outputLines.push({
            type: "success",
            content: `✓ Matrix rain ${newValue ? 'ENABLED' : 'DISABLED'}`
          });
          if (onEffectsChange) {
            onEffectsChange({ ...currentEffects, matrixRain: newValue });
          }
        } else {
          const action = args[0].toLowerCase();
          if (action === "on") {
            outputLines.push({ type: "success", content: "✓ Matrix rain ENABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, matrixRain: true });
            }
          } else if (action === "off") {
            outputLines.push({ type: "success", content: "✓ Matrix rain DISABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, matrixRain: false });
            }
          } else {
            outputLines.push({ type: "error", content: "Usage: matrix [on|off|toggle]" });
          }
        }
        break;

      case "network":
        if (args.length === 0 || args[0].toLowerCase() === "toggle") {
          const newValue = !currentEffects.particleNetwork;
          outputLines.push({
            type: "success",
            content: `✓ Particle network ${newValue ? 'ENABLED' : 'DISABLED'}`
          });
          if (onEffectsChange) {
            onEffectsChange({ ...currentEffects, particleNetwork: newValue });
          }
        } else {
          const action = args[0].toLowerCase();
          if (action === "on") {
            outputLines.push({ type: "success", content: "✓ Particle network ENABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, particleNetwork: true });
            }
          } else if (action === "off") {
            outputLines.push({ type: "success", content: "✓ Particle network DISABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, particleNetwork: false });
            }
          } else {
            outputLines.push({ type: "error", content: "Usage: network [on|off|toggle]" });
          }
        }
        break;

      case "static":
        if (args.length === 0 || args[0].toLowerCase() === "toggle") {
          const newValue = !currentEffects.staticNoise;
          outputLines.push({
            type: "success",
            content: `✓ Static noise ${newValue ? 'ENABLED' : 'DISABLED'}`
          });
          if (onEffectsChange) {
            onEffectsChange({ ...currentEffects, staticNoise: newValue });
          }
        } else {
          const action = args[0].toLowerCase();
          if (action === "on") {
            outputLines.push({ type: "success", content: "✓ Static noise ENABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, staticNoise: true });
            }
          } else if (action === "off") {
            outputLines.push({ type: "success", content: "✓ Static noise DISABLED" });
            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, staticNoise: false });
            }
          } else {
            outputLines.push({ type: "error", content: "Usage: static [on|off|toggle]" });
          }
        }
        break;

      case "/about":
        if (scrollToSection("about")) {
          outputLines.push({ type: "success", content: "Navigating to About section..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/work":
        if (scrollToSection("work")) {
          outputLines.push({ type: "success", content: "Navigating to Work section..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/skills":
        if (scrollToSection("skills")) {
          outputLines.push({ type: "success", content: "Navigating to Skills section..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/publications":
        if (scrollToSection("publications")) {
          outputLines.push({ type: "success", content: "Navigating to Publications..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/education":
        if (scrollToSection("education")) {
          outputLines.push({ type: "success", content: "Navigating to Education..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/certifications":
        if (scrollToSection("certifications")) {
          outputLines.push({ type: "success", content: "Navigating to Certifications..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "/contact":
        if (scrollToSection("contact")) {
          outputLines.push({ type: "success", content: "Navigating to Contact section..." });
        } else {
          outputLines.push({ type: "error", content: "Section not found" });
        }
        break;

      case "clear":
        setHistory([
          { type: "info", content: "  ▄▄▄       ██▀███   ▄████▄   ██░ ██     ██▓     ██▓ ███▄    █  █    ██ ▒██   ██▒" },
          { type: "info", content: " ▒████▄    ▓██ ▒ ██▒▒██▀ ▀█  ▓██░ ██▒   ▓██▒    ▓██▒ ██ ▀█   █  ██  ▓██▒▒▒ █ █ ▒░" },
          { type: "info", content: " ▒██  ▀█▄  ▓██ ░▄█ ▒▒▓█    ▄ ▒██▀▀██░   ▒██░    ▒██▒▓██  ▀█ ██▒▓██  ▒██░░░  █   ░" },
          { type: "info", content: " ░██▄▄▄▄██ ▒██▀▀█▄  ▒▓▓▄ ▄██▒░▓█ ░██    ▒██░    ░██░▓██▒  ▐▌██▒▓▓█  ░██░ ░ █ █ ▒ " },
          { type: "info", content: "  ▓█   ▓██▒░██▓ ▒██▒▒ ▓███▀ ░░▓█▒░██▓   ░██████▒░██░▒██░   ▓██░▒▒█████▓ ▒██▒ ▒██▒" },
          { type: "info", content: "  ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ░▒ ▒  ░ ▒ ░░▒░▒   ░ ▒░▓  ░░▓  ░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ▒▒ ░ ░▓ ░" },
          { type: "info", content: "   ▒   ▒▒ ░  ░▒ ░ ▒░  ░  ▒    ▒ ░▒░ ░   ░ ░ ▒  ░ ▒ ░░ ░░   ░ ▒░░░▒░ ░ ░ ░░   ░▒ ░" },
          { type: "info", content: "" },
          { type: "success", content: "Portfolio Terminal [Version 1.0.0-arch]" },
          { type: "output", content: "Type 'help' for available commands, 'neofetch' for system info" },
          { type: "output", content: "" },
        ]);
        return;

      case "exit":
        outputLines.push({ type: "success", content: "Terminal closed." });
        setTimeout(() => setIsOpen(false), 500);
        break;

      case "pwd":
        outputLines.push({ type: "output", content: currentDir });
        break;

      case "ls":
        {
          const targetPath = args.length > 0 ? args[0] : ".";
          let absolutePath: string;

          // Resolve to absolute path
          if (targetPath === ".") {
            absolutePath = currentDir;
          } else if (targetPath === "..") {
            absolutePath = currentDir.split("/").slice(0, -1).join("/") || "/home/barnaba";
          } else if (targetPath.startsWith("/")) {
            absolutePath = targetPath;
          } else if (targetPath === "~") {
            absolutePath = "/home/barnaba";
          } else {
            absolutePath = `${currentDir}/${targetPath}`;
          }

          // Normalize path
          const normalized = absolutePath.replace(/\/+/g, "/").replace(/\/$/, "");

          // Navigate to the path in filesystem
          let current: any = null;

          if (normalized === "/home/barnaba") {
            current = filesystem["/home/barnaba"];
          } else if (normalized.startsWith("/home/barnaba/")) {
            const relativePath = normalized.substring("/home/barnaba/".length);
            const parts = relativePath.split("/");
            current = filesystem["/home/barnaba"];

            for (const part of parts) {
              if (current && typeof current === "object" && part in current) {
                current = current[part];
              } else {
                current = null;
                break;
              }
            }
          }

          // Display results
          if (current && typeof current === "object" && !Array.isArray(current)) {
            const entries = Object.keys(current);
            if (entries.length > 0) {
              outputLines.push({ type: "output", content: "" });
              entries.forEach(entry => {
                const isDir = typeof current[entry] === "object";
                outputLines.push({
                  type: isDir ? "info" : "output",
                  content: isDir ? `  ${entry}/` : `  ${entry}`
                });
              });
              outputLines.push({ type: "output", content: "" });
            } else {
              outputLines.push({ type: "output", content: "" });
            }
          } else {
            outputLines.push({ type: "error", content: `ls: cannot access '${targetPath}': No such file or directory` });
          }
        }
        break;

      case "cd":
        {
          if (args.length === 0) {
            setCurrentDir("/home/barnaba");
            outputLines.push({ type: "success", content: "Changed directory to ~" });
          } else {
            let target = args[0];

            // Handle special cases
            if (target === "~" || target === "~/") {
              setCurrentDir("/home/barnaba");
              outputLines.push({ type: "success", content: "Changed directory to ~" });
              break;
            }

            // Build full path
            const newPath = target.startsWith("/")
              ? target
              : target === ".."
                ? currentDir.split("/").slice(0, -1).join("/") || "/home/barnaba"
                : `${currentDir}/${target}`;

            const normalized = newPath.replace(/\/+/g, "/");

            // Check if path exists - handle /home/barnaba as base
            let current: any = null;
            let valid = false;

            if (normalized === "/home/barnaba" || normalized === "/home/barnaba/") {
              current = filesystem["/home/barnaba"];
              valid = true;
            } else if (normalized.startsWith("/home/barnaba/")) {
              const subPath = normalized.substring("/home/barnaba/".length);
              const parts = subPath.split("/").filter(p => p);
              current = filesystem["/home/barnaba"];

              for (const part of parts) {
                if (current && current[part] && typeof current[part] === "object") {
                  current = current[part];
                } else {
                  current = null;
                  break;
                }
              }

              if (current && typeof current === "object") {
                valid = true;
              }
            }

            if (valid) {
              setCurrentDir(normalized);
              outputLines.push({ type: "success", content: `Changed directory to ${target}` });
            } else {
              outputLines.push({ type: "error", content: `cd: ${target}: Not a directory` });
            }
          }
        }
        break;

      case "cat":
        {
          if (args.length === 0) {
            outputLines.push({ type: "error", content: "cat: missing file operand" });
          } else {
            const fileName = args[0];
            const path = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
            const normalized = path.replace(/\/+/g, "/");

            // Navigate to file - handle /home/barnaba as base
            let current: any = null;

            if (normalized.startsWith("/home/barnaba/")) {
              const subPath = normalized.substring("/home/barnaba/".length);
              const parts = subPath.split("/").filter(p => p);
              current = filesystem["/home/barnaba"];

              for (const part of parts) {
                if (current && current[part]) {
                  current = current[part];
                } else {
                  current = null;
                  break;
                }
              }
            }

            if (current && typeof current === "string") {
              outputLines.push({ type: "output", content: "" });
              current.split("\n").forEach(line => {
                outputLines.push({ type: "output", content: line });
              });
              outputLines.push({ type: "output", content: "" });
            } else {
              outputLines.push({ type: "error", content: `cat: ${fileName}: No such file or directory` });
            }
          }
        }
        break;

      case "":
        // Empty command, just show prompt
        break;

      default:
        outputLines.push({
          type: "error",
          content: `Command not found: ${command}. Type 'help' for available commands.`,
        });
    }

    setHistory(prev => [...prev, ...outputLines]);
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      processCommand(input);
      setInput("");
    }
  };

  // Handle arrow key navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  // Get line color based on type (Arch Linux color scheme)
  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-[#1793D1]"; // Arch Linux blue
      case "output":
        return "text-gray-300";
      case "error":
        return "text-red-500";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-[#1793D1]"; // Arch Linux blue
      case "warning":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header - Arch Linux Style */}
            <div className="bg-[#0a0a0a] border-b border-[#1793D1]/40 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-[#cc241d] hover:bg-[#fb4934] transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#d79921]" />
                  <div className="w-3 h-3 rounded-full bg-[#98971a]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#1793D1] font-bold">
                    ◢◤
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    barnaba@portfolio: ~
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-[#1793D1] transition-colors text-xs font-mono"
              >
                ✕
              </button>
            </div>

            {/* Terminal Body - Pure black background like Arch */}
            <div className="bg-[#0a0a0a] p-6 font-mono text-sm h-[500px] flex flex-col shadow-2xl">
              {/* History */}
              <div ref={historyRef} className="flex-1 overflow-y-auto mb-4 space-y-0.5 scrollbar-thin scrollbar-thumb-[#1793D1]/30 scrollbar-track-transparent">
                {history.map((line, index) => (
                  <div key={index} className={getLineColor(line.type)}>
                    {line.content}
                  </div>
                ))}
              </div>

              {/* Input - Arch Linux style prompt */}
              <form onSubmit={handleSubmit} className="flex items-start gap-2">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-emerald-400 font-semibold">
                    [barnaba@portfolio {currentDir.replace('/home/barnaba', '~')}]
                  </span>
                  <span className="text-white font-semibold">$</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-[#1793D1] pl-1"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="text-[#1793D1] animate-pulse">▊</span>
              </form>
            </div>

            {/* Arch Linux corner accent */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-[#1793D1]/60" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-[#1793D1]/60" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-[#1793D1]/60" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-[#1793D1]/60" />
          </motion.div>

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] font-mono text-xs text-gray-500"
          >
            Press <span className="text-[#1793D1]">`</span> or <span className="text-[#1793D1]">ESC</span> to close terminal
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
