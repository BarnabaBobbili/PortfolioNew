"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SystemHUD() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [cpu, setCpu] = useState(47);
  const [memory, setMemory] = useState(2.4);
  const [netUp, setNetUp] = useState(125);
  const [netDown, setNetDown] = useState(340);
  const [visitors, setVisitors] = useState(1247);
  const [isVisible, setIsVisible] = useState(true);
  const startTime = useRef(Date.now());

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update uptime
  useEffect(() => {
    const updateUptime = () => {
      const elapsed = Date.now() - startTime.current;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      setUptime({ hours, minutes, seconds });
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate fluctuating metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((prev) => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setMemory((prev) => Math.max(1.5, Math.min(7.8, prev + (Math.random() - 0.5) * 0.3)));
      setNetUp((prev) => Math.max(50, Math.min(500, prev + (Math.random() - 0.5) * 50)));
      setNetDown((prev) => Math.max(100, Math.min(1000, prev + (Math.random() - 0.5) * 100)));
      setVisitors((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "CPU", value: `${cpu.toFixed(0)}%`, color: cpu > 80 ? "text-red-400" : "text-cyan-400" },
    { label: "MEM", value: `${memory.toFixed(1)}GB`, color: memory > 6 ? "text-yellow-400" : "text-cyan-400" },
    { label: "NET", value: `↑${netUp.toFixed(0)}kb/s ↓${netDown.toFixed(0)}kb/s`, color: "text-green-400" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-24 right-4 z-40 font-mono text-xs select-none"
        >
          {/* Main HUD Container */}
          <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 space-y-2 min-w-[220px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <span className="text-cyan-400 font-bold">SYSTEM.STATUS</span>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-cyan-400 transition-colors text-[10px]"
              >
                [X]
              </button>
            </div>

            {/* Metrics */}
            <div className="space-y-1.5">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-400">[{metric.label}]</span>
                  <span className={metric.color}>{metric.value}</span>
                </motion.div>
              ))}

              <div className="border-t border-cyan-500/20 pt-1.5 mt-1.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">[TIME]</span>
                  <span className="text-blue-400">{time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">[UPTIME]</span>
                  <span className="text-purple-400">
                    {uptime.hours}h {uptime.minutes}m {uptime.seconds}s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">[VISITORS]</span>
                  <span className="text-cyan-400">{visitors.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">[STATUS]</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400/50" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400/50" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50" />
          </div>

          {/* Terminal hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 text-center text-[10px] text-cyan-400/50"
          >
            Press <span className="text-cyan-400">`</span> for terminal
          </motion.div>
        </motion.div>
      )}

      {/* Restore button when hidden */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(true)}
          className="fixed top-24 right-4 z-40 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded px-2 py-1 font-mono text-[10px] text-cyan-400 hover:bg-cyan-500/10 transition-colors"
        >
          [SYS]
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Fix for useRef
import { useRef } from "react";
