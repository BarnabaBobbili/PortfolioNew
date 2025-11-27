"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".animate-in");

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const socials = [
    { name: "GitHub", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Dribbble", url: "#" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.h2
          className="animate-in text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 sm:mb-7 md:mb-8 text-gradient"
        >
          Let's Create
          <br />
          Something Extraordinary
        </motion.h2>

        <motion.p
          className="animate-in text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-gray-400 mb-12 sm:mb-14 md:mb-16 max-w-2xl mx-auto px-4"
        >
          Have a project in mind? Let's collaborate and bring your vision to
          life.
        </motion.p>

        <motion.div className="animate-in mb-12 sm:mb-14 md:mb-16">
          <MagneticButton className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-void font-mono font-medium text-base sm:text-lg rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            Get In Touch
          </MagneticButton>
        </motion.div>

        <motion.div className="animate-in flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center font-mono text-xs sm:text-sm">
          {socials.map((social) => (
            <MagneticButton
              key={social.name}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <a href={social.url}>
                {social.name}
              </a>
            </MagneticButton>
          ))}
        </motion.div>

        <motion.div className="animate-in mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-10 md:pt-12 border-t border-white/10">
          <p className="font-mono text-gray-600 text-xs sm:text-sm">
            © 2024 All rights reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}
