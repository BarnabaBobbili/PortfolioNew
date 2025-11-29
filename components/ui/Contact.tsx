"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isResumeHovered, setIsResumeHovered] = useState(false);

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
      id="contact"
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

        <motion.div className="animate-in mb-12 sm:mb-14 md:mb-16 flex gap-3 sm:gap-4 justify-center items-center flex-wrap">
          <MagneticButton className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-void font-mono font-medium text-base sm:text-lg rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            <a href="mailto:barnababobbili098@gmail.com" className="block">
              Get In Touch
            </a>
          </MagneticButton>

          <MagneticButton
            className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-white text-void font-mono font-medium text-base sm:text-lg rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all"
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
      </div>
    </section>
  );
}
