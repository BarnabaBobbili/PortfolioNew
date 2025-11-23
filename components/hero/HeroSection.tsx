"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DecodeText } from "./DecodeText";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !titleContainerRef.current ||
      !subtitleRef.current ||
      !ctaRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Scroll-driven Z-space push and blur
      gsap.to(titleContainerRef.current, {
        z: -500,
        rotationX: -15,
        filter: "blur(20px)",
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -100,
        opacity: 0,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(ctaRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Initial subtitle entrance
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 2,
          ease: "power3.out",
        }
      );

      // CTA entrance
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 2.5,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-8"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title with Decode Effect */}
        <div
          ref={titleContainerRef}
          className="mb-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-bold leading-none">
            <div className="mb-4">
              <DecodeText
                text="BARNABA"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-blue-100"
                delay={500}
                speed={40}
              />
            </div>
            <div>
              <DecodeText
                text="BOBBILI"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-gray-100 to-white"
                delay={800}
                speed={40}
              />
            </div>
          </h1>

          {/* Glitch overlay effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-xl" />
          </motion.div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl font-mono text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-blue-300">[SYSTEM.INIT]</span> Architecting
          immersive digital experiences at the intersection of{" "}
          <span className="text-white">art</span>,{" "}
          <span className="text-white">code</span>, and{" "}
          <span className="text-white">imagination</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex gap-6 justify-center items-center">
          <MagneticButton className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-mono font-medium rounded-full border border-white/20 hover:border-blue-400/50 transition-all overflow-hidden">
            <span className="relative z-10">EXPLORE PROJECTS</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </MagneticButton>

          <MagneticButton className="px-8 py-4 border border-white/20 text-white font-mono font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all">
            INITIALIZE CONTACT
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-gray-500 tracking-widest">
              SCROLL
            </span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
              <motion.div
                className="w-1.5 h-1.5 bg-blue-300 rounded-full mx-auto shadow-lg shadow-blue-300/50"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Decorative corner brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-300/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-300/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-300/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-300/30" />
      </div>
    </section>
  );
}
