"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        filter: "blur(20px)",
        y: 50,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(titleRef.current, {
      y: -100,
      opacity: 0.3,
      scale: 0.95,
    }).to(
      subtitleRef.current,
      {
        y: -50,
        opacity: 0,
      },
      "<"
    );
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-serif font-bold mb-8 text-gradient leading-tight"
          style={{ willChange: "transform" }}
        >
          {splitText("BARNABA")}
          <br />
          {splitText("BOBBILI")}
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl font-mono text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Crafting immersive digital experiences at the intersection of art,
          code, and imagination
        </motion.p>

        <motion.div
          className="flex gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <MagneticButton className="px-8 py-4 bg-white text-void font-mono font-medium rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            View Work
          </MagneticButton>

          <MagneticButton className="px-8 py-4 border border-white/20 text-white font-mono font-medium rounded-full hover:border-white/40 transition-colors">
            Contact
          </MagneticButton>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
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
        </motion.div>
      </div>
    </section>
  );
}
