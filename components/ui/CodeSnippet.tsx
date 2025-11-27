"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  animated?: boolean;
}

export function CodeSnippet({
  code,
  language = "javascript",
  showLineNumbers = true,
  animated = true
}: CodeSnippetProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayedCode(code);
      return;
    }

    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(code.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, code, animated]);

  const lines = displayedCode.split("\n");

  // Simple syntax highlighting
  const highlightSyntax = (line: string) => {
    // Keywords
    line = line.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g,
      '<span class="text-purple-400">$1</span>'
    );

    // Strings
    line = line.replace(
      /("[^"]*"|'[^']*'|`[^`]*`)/g,
      '<span class="text-green-400">$1</span>'
    );

    // Comments
    line = line.replace(
      /(\/\/.*$)/g,
      '<span class="text-gray-500">$1</span>'
    );

    // Numbers
    line = line.replace(
      /\b(\d+)\b/g,
      '<span class="text-yellow-400">$1</span>'
    );

    return line;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden font-mono text-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-cyan-900/20 border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-cyan-400 text-xs">{language}</span>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-4">
            {showLineNumbers && (
              <span className="text-gray-600 select-none min-w-[2em] text-right">
                {index + 1}
              </span>
            )}
            <span
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
            />
          </div>
        ))}

        {animated && currentIndex < code.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
        )}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
    </motion.div>
  );
}
