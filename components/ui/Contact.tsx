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
      className="relative min-h-screen flex items-center justify-center px-8 py-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="animate-in text-6xl md:text-8xl font-serif font-bold mb-8 text-gradient"
        >
          Let's Create
          <br />
          Something Extraordinary
        </motion.h2>

        <motion.p
          className="animate-in text-xl md:text-2xl font-mono text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Have a project in mind? Let's collaborate and bring your vision to
          life.
        </motion.p>

        <motion.div className="animate-in mb-16">
          <MagneticButton className="px-12 py-6 bg-white text-void font-mono font-medium text-lg rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            Get In Touch
          </MagneticButton>
        </motion.div>

        <motion.div className="animate-in flex gap-8 justify-center items-center font-mono text-sm">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {social.name}
            </a>
          ))}
        </motion.div>

        <motion.div className="animate-in mt-24 pt-12 border-t border-white/10">
          <p className="font-mono text-gray-600 text-sm">
            © 2024 All rights reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}
