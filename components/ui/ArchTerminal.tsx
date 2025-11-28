"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "error" | "warning";
  content: string;
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
    "education.txt": "M.Tech in Computer Science and Engineering\nAmrita Vishwa Vidhyapeetam, Coimbatore\n2025 - Present\n\nB.E in Computer Science and Engineering (AI & ML)\nSathyabama Institute of Science and Technology, Chennai\n2021 - 2025 | CGPA: 7.47",
    "publications.txt": "Multi-Modal Security Integration and Role-Based Access Control for Secure File Management System\nIEEE, 2025\nAuthors: Barnaba Bobbili, et al.\nTags: Security, Biometrics, Access Control",
    "certifications.txt": "1. Oracle Cloud Infrastructure - Certified Foundations Associate (2024)\n2. Data Analysis with Python - IBM (2024)\n3. Java Data Structures and Algorithms - Udemy (2024)",
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
    { type: "output", content: "Arch Linux 6.6.1-arch1-1 (tty1)" },
    { type: "output", content: "" },
    { type: "output", content: "barnaba-portfolio login: barnaba" },
    { type: "output", content: "Password:" },
    { type: "output", content: "Last login: " + new Date().toLocaleString() },
    { type: "output", content: "" },
    { type: "output", content: "Welcome to Barnaba's Portfolio Terminal!" },
    { type: "output", content: "" },
    { type: "output", content: "Type 'help' to see available commands" },
    { type: "output", content: "Type 'ls' to list files" },
    { type: "output", content: "Type 'cat <filename>' to read files" },
    { type: "output", content: "" },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("~");
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

  // Add lines instantly (no typewriter effect)
  const addOutputLines = (lines: string[], type: TerminalLine["type"] = "output") => {
    setHistory(prev => [
      ...prev,
      ...lines.map(content => ({ type, content }))
    ]);

    // Re-focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
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
  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    // Add command to history
    setHistory(prev => [...prev, {
      type: "command",
      content: `[barnaba@portfolio ${currentDir}]$ ${cmd}`
    }]);

    if (!command) return;

    // Process command
    let outputLines: string[] = [];

    switch (command) {
      case "ls":
        {
          // Determine which directory to list
          let dirToList = currentDir === "~" || currentDir === "/home/barnaba" ? "/home/barnaba" : "/home/barnaba/projects";

          if (currentDir === "~" || currentDir === "/home/barnaba") {
            const homeDir = filesystem["/home/barnaba"];
            const entries = Object.keys(homeDir);
            outputLines = entries.map(entry => {
              const item = homeDir[entry as keyof typeof homeDir];
              return typeof item === "object" ? `${entry}/` : entry;
            });
          } else if (currentDir === "~/projects") {
            const projects = filesystem["/home/barnaba"]["projects"];
            outputLines = Object.keys(projects);
          } else {
            outputLines = ["about.txt", "contact.txt", "skills.txt", "projects/"];
          }
        }
        break;

      case "pwd":
        outputLines = ["/home/barnaba"];
        break;

      case "whoami":
        outputLines = ["barnaba"];
        break;

      case "uname":
        if (args[0] === "-a") {
          outputLines = ["Linux barnaba-portfolio 6.6.1-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux"];
        } else {
          outputLines = ["Linux"];
        }
        break;

      case "cat":
        {
          if (!args[0]) {
            outputLines = ["cat: missing operand"];
            addOutputLines(outputLines, "error");
            return;
          }

          const fileName = args[0];
          let fileContent: string | null = null;

          // Check in current directory
          if (currentDir === "~" || currentDir === "/home/barnaba") {
            // Check home directory
            const homeDir = filesystem["/home/barnaba"];
            if (fileName in homeDir) {
              const item = homeDir[fileName as keyof typeof homeDir];
              if (typeof item === "string") {
                fileContent = item;
              }
            }
          } else if (currentDir === "~/projects") {
            // Check projects directory
            const projects = filesystem["/home/barnaba"]["projects"];
            if (fileName in projects) {
              fileContent = projects[fileName as keyof typeof projects];
            }
          }

          if (fileContent) {
            outputLines = fileContent.split("\n");
          } else {
            outputLines = [`cat: ${fileName}: No such file or directory`];
            addOutputLines(outputLines, "error");
            return;
          }
        }
        break;

      case "echo":
        outputLines = [args.join(" ")];
        break;

      case "date":
        outputLines = [new Date().toString()];
        break;

      case "neofetch":
        outputLines = [
          "                   -`                    barnaba@portfolio",
          "                  .o+`                   -----------------",
          "                 `ooo/                   OS: Arch Linux x86_64",
          "                `+oooo:                  Host: Portfolio System",
          "               `+oooooo:                 Kernel: 6.6.1-arch1-1",
          "               -+oooooo+:                Uptime: " + Math.floor(performance.now() / 1000) + " secs",
          "             `/:-:++oooo+:               Shell: bash 5.2.15",
          "            `/++++/+++++++:              Terminal: portfolio-term",
          "           `/++++++++++++++:             Theme: " + currentTheme,
          "          `/+++ooooooooooooo/`           CPU: React 18 @ 60fps",
          "         ./ooosssso++osssssso+`          GPU: Three.js WebGL",
          "        .oossssso-````/ossssss+`         Memory: Optimized",
          "       -osssssso.      :ssssssso.",
          "      :osssssss/        osssso+++.       Effects:",
          "     /ossssssss/        +ssssooo/-       Scanlines: " + (currentEffects.scanlines ? "ON" : "OFF"),
          "   `/ossssso+/:-        -:/+osssso+-     Matrix: " + (currentEffects.matrixRain ? "ON" : "OFF"),
          "  `+sso+:-`                 `.-/+oso:    Network: " + (currentEffects.particleNetwork ? "ON" : "OFF"),
          " `++:.                           `-/+/   Static: " + (currentEffects.staticNoise ? "ON" : "OFF"),
          " .`                                 `/",
          ""
        ];
        break;

      case "pacman":
        if (args[0] === "-S") {
          const pkg = args[1];
          if (!pkg) {
            outputLines = ["error: no targets specified (use -h for help)"];
            addOutputLines(outputLines, "error");
            return;
          }

          // Map package names to features
          const packages: Record<string, { effect?: keyof ControlPanelSettings; theme?: Theme }> = {
            "scanlines": { effect: "scanlines" },
            "matrix": { effect: "matrixRain" },
            "network": { effect: "particleNetwork" },
            "static": { effect: "staticNoise" },
            "theme-blue": { theme: "blue" },
            "theme-cyan": { theme: "cyan" },
            "theme-purple": { theme: "purple" },
            "theme-green": { theme: "green" },
            "theme-red": { theme: "red" }
          };

          if (packages[pkg]) {
            const { effect, theme } = packages[pkg];

            outputLines = [
              "resolving dependencies...",
              "looking for conflicting packages...",
              "",
              "Packages (1) " + pkg + "-1.0.0",
              "",
              ":: Proceed with installation? [Y/n] Y",
              "(1/1) installing " + pkg + "...",
            ];

            addOutputLines(outputLines);

            if (effect && onEffectsChange) {
              onEffectsChange({ ...currentEffects, [effect]: true });
            }
            if (theme && onThemeChange) {
              onThemeChange(theme);
            }
            return;
          } else {
            outputLines = [`error: target not found: ${pkg}`];
            addOutputLines(outputLines, "error");
            return;
          }
        } else if (args[0] === "-R") {
          const pkg = args[1];
          if (!pkg) {
            outputLines = ["error: no targets specified (use -h for help)"];
            addOutputLines(outputLines, "error");
            return;
          }

          const packages: Record<string, keyof ControlPanelSettings> = {
            "scanlines": "scanlines",
            "matrix": "matrixRain",
            "network": "particleNetwork",
            "static": "staticNoise"
          };

          if (packages[pkg]) {
            outputLines = [
              "",
              "Packages (1) " + pkg + "-1.0.0",
              "",
              ":: Proceed with removal? [Y/n] Y",
              "(1/1) removing " + pkg + "...",
            ];

            addOutputLines(outputLines);

            if (onEffectsChange) {
              onEffectsChange({ ...currentEffects, [packages[pkg]]: false });
            }
            return;
          } else {
            outputLines = [`error: target not found: ${pkg}`];
            addOutputLines(outputLines, "error");
            return;
          }
        } else {
          outputLines = ["usage: pacman -S <package> | pacman -R <package>"];
        }
        break;

      case "systemctl":
        if (args[0] === "status") {
          const service = args[1];
          const services: Record<string, boolean> = {
            "scanlines": currentEffects.scanlines,
            "matrix": currentEffects.matrixRain,
            "network": currentEffects.particleNetwork,
            "static": currentEffects.staticNoise
          };

          if (service && services.hasOwnProperty(service)) {
            const isActive = services[service];
            outputLines = [
              `● ${service}.service - ${service.charAt(0).toUpperCase() + service.slice(1)} Effect`,
              `   Loaded: loaded (/usr/lib/systemd/system/${service}.service; enabled)`,
              `   Active: ${isActive ? "active (running)" : "inactive (dead)"} since ${new Date().toLocaleString()}`,
              `   Main PID: ${Math.floor(Math.random() * 10000)} (${service})`,
              `   Memory: ${Math.floor(Math.random() * 50)}M`,
              `   CGroup: /system.slice/${service}.service`,
              `           └─${Math.floor(Math.random() * 10000)} /usr/bin/${service}`,
              ""
            ];
          } else {
            outputLines = ["Usage: systemctl status <service>", "Available: scanlines, matrix, network, static"];
          }
        } else {
          outputLines = ["Usage: systemctl status <service>"];
        }
        break;

      case "cd":
        const target = args[0] || "~";
        if (target === "~" || target === "/home/barnaba") {
          setCurrentDir("~");
        } else if (target === "projects") {
          setCurrentDir("~/projects");
        } else if (target === "..") {
          if (currentDir === "~/projects") {
            setCurrentDir("~");
          }
        } else {
          outputLines = [`bash: cd: ${target}: No such file or directory`];
          addOutputLines(outputLines, "error");
        return;
          return;
        }
        return;

      case "goto":
        const sections: Record<string, string> = {
          "about": "about",
          "work": "work",
          "skills": "skills",
          "publications": "publications",
          "education": "education",
          "certifications": "certifications",
          "contact": "contact"
        };

        if (args[0] && sections[args[0]]) {
          if (scrollToSection(sections[args[0]])) {
            outputLines = [`Navigating to ${args[0]}...`];
          } else {
            outputLines = [`Section '${args[0]}' not found`];
            addOutputLines(outputLines, "error");
        return;
            return;
          }
        } else {
          outputLines = [
            "Usage: goto <section>",
            "Available: about, work, skills, publications, education, certifications, contact"
          ];
        }
        break;

      case "help":
      case "man":
        outputLines = [
          "PORTFOLIO TERMINAL - Arch Linux Style",
          "",
          "FILE OPERATIONS:",
          "  ls                - list directory contents",
          "  pwd               - print working directory",
          "  cat <file>        - display file contents",
          "  cd <dir>          - change directory",
          "",
          "SYSTEM INFO:",
          "  whoami            - print username",
          "  uname [-a]        - print system information",
          "  date              - display current date and time",
          "  neofetch          - display system information with logo",
          "",
          "PACKAGE MANAGEMENT (Arch):",
          "  pacman -S <pkg>   - install package (scanlines, matrix, network, static)",
          "  pacman -S theme-<color> - install theme (blue, cyan, purple, green, red)",
          "  pacman -R <pkg>   - remove package",
          "",
          "SERVICES:",
          "  systemctl status <service> - check service status",
          "",
          "NAVIGATION:",
          "  goto <section>    - navigate to portfolio section",
          "",
          "OTHER:",
          "  echo <text>       - display text",
          "  clear             - clear terminal screen",
          "  exit              - close terminal",
          ""
        ];
        break;

      case "clear":
        setHistory([
          { type: "output", content: "Arch Linux 6.6.1-arch1-1 (tty1)" },
          { type: "output", content: "" },
        ]);
        return;

      case "exit":
        outputLines = ["logout"];
        addOutputLines(outputLines);
        setTimeout(() => setIsOpen(false), 500);
        return;

      default:
        outputLines = [`bash: ${command}: command not found`];
        addOutputLines(outputLines, "error");
        return;
    }

    // For commands that set outputLines but didn't return early
    if (outputLines.length > 0) {
      addOutputLines(outputLines);
    }
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      processCommand(input);
      setInput("");

      // Ensure input is focused after command completes
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10);
    }
  };

  // Handle arrow key navigation
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
        if (historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  // Get line color (Arch style)
  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-white";
      case "output":
        return "text-gray-300";
      case "error":
        return "text-red-400";
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Terminal Window - Arch Style */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-[#1c1c1c] border-b border-[#2a2a2a] px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff6b63] transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-gray-500 ml-2">
                  barnaba@portfolio: ~
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="bg-black p-4 font-mono text-[13px] leading-relaxed h-[600px] flex flex-col shadow-2xl"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* History */}
              <div
                ref={historyRef}
                className="flex-1 overflow-y-auto mb-3 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                onWheel={(e) => e.stopPropagation()}
              >
                {history.map((line, index) => (
                  <div key={index} className={getLineColor(line.type)}>
                    {line.content}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-start gap-2">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-green-400">[barnaba@portfolio {currentDir}]</span>
                  <span className="text-white">$</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-white"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[101] font-mono text-[11px] text-gray-600"
          >
            Press <span className="text-gray-400">`</span> or <span className="text-gray-400">ESC</span> to close • Type <span className="text-gray-400">help</span> for commands
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
