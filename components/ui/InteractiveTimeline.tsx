"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  category: "education" | "work" | "achievement";
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function InteractiveTimeline({ items, className = "" }: InteractiveTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCategoryColor = (category: TimelineItem["category"]) => {
    switch (category) {
      case "education":
        return "from-blue-500 to-cyan-500";
      case "work":
        return "from-purple-500 to-pink-500";
      case "achievement":
        return "from-green-500 to-emerald-500";
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500 opacity-30" />

      {/* Timeline items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative pl-20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Node */}
            <motion.div
              className="absolute left-6 top-2 w-5 h-5 rounded-full border-2 border-cyan-400 bg-void flex items-center justify-center"
              animate={{
                scale: activeIndex === index ? 1.5 : 1,
                boxShadow:
                  activeIndex === index
                    ? "0 0 20px rgba(74, 144, 226, 0.8)"
                    : "0 0 0px rgba(74, 144, 226, 0)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </motion.div>

            {/* Connecting line to content */}
            <motion.div
              className="absolute left-11 top-3 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
              animate={{
                scaleX: activeIndex === index ? 1 : 0.5,
                opacity: activeIndex === index ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content card */}
            <motion.div
              className={`bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 transition-all duration-300 ${
                activeIndex === index ? "border-cyan-500/60 shadow-lg shadow-cyan-500/20" : ""
              }`}
            >
              {/* Year tag */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-2 bg-gradient-to-r ${getCategoryColor(
                  item.category
                )} text-white`}
              >
                {item.year}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{item.description}</p>

              {/* Animated pulse when active */}
              {activeIndex === index && (
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-20 -z-10"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>

            {/* Data packet animation */}
            {activeIndex === index && (
              <motion.div
                className="absolute left-8 top-2 w-2 h-2 bg-cyan-400 rounded-full"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 100, opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Timeline end marker */}
      <motion.div
        className="absolute left-6 -bottom-8 w-5 h-5"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-full border-2 border-cyan-400 rotate-45 bg-void" />
      </motion.div>
    </div>
  );
}
