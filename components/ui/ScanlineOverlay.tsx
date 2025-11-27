"use client";

import { motion, AnimatePresence } from "framer-motion";

export function ScanlineOverlay({ isEnabled = false }: { isEnabled?: boolean }) {

  return (
    <>
      <AnimatePresence>
        {isEnabled && (
          <>
            {/* Scanlines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[99]"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.15),
                    rgba(0, 0, 0, 0.15) 1px,
                    transparent 1px,
                    transparent 2px
                  )
                `,
                animation: "scan 8s linear infinite",
              }}
            />

            {/* Vignette effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[99]"
              style={{
                background: `
                  radial-gradient(
                    ellipse at center,
                    transparent 0%,
                    transparent 60%,
                    rgba(0, 10, 20, 0.3) 100%
                  )
                `,
              }}
            />

            {/* CRT curvature simulation (subtle) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[99]"
              style={{
                background: `
                  radial-gradient(
                    ellipse at center,
                    rgba(100, 200, 255, 0.03) 0%,
                    transparent 50%
                  )
                `,
              }}
            />
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </>
  );
}
