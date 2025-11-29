"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/MagneticButton";
import { DecodeText } from "./DecodeText";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ textMode }: { textMode: '3d' | 'decode' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isResumeHovered, setIsResumeHovered] = useState(false);

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

      // Initial subtitle entrance - Delayed after loading screen
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
          delay: 5,
          ease: "power3.out",
        }
      );

      // CTA entrance - Delayed after loading screen
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
          delay: 5.5,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ perspective: "1000px" }}
    >
      <div className="w-full text-center">
        {/* Main Title with Decode Effect */}
        <div
          ref={titleContainerRef}
          className="mb-4 sm:mb-6 md:mb-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Conditional rendering based on textMode */}
          {textMode === '3d' ? (
            // 3D name is rendered in SceneCanvas, just reserve space
            <div className="h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh]" />
          ) : (
            // Decode text rendered in DOM
            <div className="h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] flex flex-col items-center justify-center pt-8 sm:pt-10 md:pt-12">
              <DecodeText
                text="BARNABA"
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-serif font-bold block mb-2 sm:mb-3 md:mb-4"
                delay={3500}
                speed={40}
              />
              <DecodeText
                text="BOBBILI"
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[11rem] font-serif font-bold block"
                delay={3900}
                speed={40}
              />
            </div>
          )}

          {/* Glitch overlay effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, delay: 4.5 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-xl" />
          </motion.div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-mono text-gray-400 mb-4 sm:mb-5 md:mb-6 mt-8 sm:mt-12 md:mt-16 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
        >
          <span className="text-cyan-400">[SYSTEM.INIT]</span> Architecting
          immersive digital experiences at the intersection of{" "}
          <span className="text-white">art</span>,{" "}
          <span className="text-white">code</span>, and{" "}
          <span className="text-white">imagination</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex gap-3 sm:gap-4 justify-center items-center flex-wrap mb-16 sm:mb-20 px-4">
          <MagneticButton className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-void font-mono font-medium text-xs sm:text-sm md:text-base rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            <a href="#work" className="block">
              <span className="hidden sm:inline">EXPLORE PROJECTS</span>
              <span className="sm:hidden">PROJECTS</span>
            </a>
          </MagneticButton>

          <MagneticButton className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-void font-mono font-medium text-xs sm:text-sm md:text-base rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            <a href="mailto:barnababobbili098@gmail.com" className="block">
              <span className="hidden sm:inline">INITIALIZE CONTACT</span>
              <span className="sm:hidden">CONTACT</span>
            </a>
          </MagneticButton>

          <MagneticButton
            className="px-4 sm:px-5 py-3 sm:py-4 bg-white text-void font-mono font-medium text-xs sm:text-sm md:text-base rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              onMouseEnter={() => setIsResumeHovered(true)}
              onMouseLeave={() => setIsResumeHovered(false)}
            >
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: isResumeHovered ? "auto" : 0,
                  opacity: isResumeHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden whitespace-nowrap hidden sm:inline"
              >
                MY RESUME
              </motion.span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 2v6h6" fill="none" stroke="white" strokeWidth="2" />
                <path d="M9 13h6M9 17h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
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
        <div className="hidden sm:block absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-l-2 border-t-2 border-blue-300/30" />
        <div className="hidden sm:block absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-r-2 border-t-2 border-blue-300/30" />
        <div className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-l-2 border-b-2 border-blue-300/30" />
        <div className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-r-2 border-b-2 border-blue-300/30" />
      </div>
    </section>
  );
}
