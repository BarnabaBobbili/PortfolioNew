"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    id: 1,
    title: "Neural Rendering Techniques for Real-Time Web Applications",
    conference: "SIGGRAPH 2024",
    authors: "Your Name, et al.",
    year: "2024",
    link: "#",
    tags: ["Neural Rendering", "WebGL 2.0", "Real-time"],
  },
  {
    id: 2,
    title: "Optimizing Three.js Performance for Large-Scale Interactive Experiences",
    conference: "ACM CHI 2024",
    authors: "Your Name, Co-Author",
    year: "2024",
    link: "#",
    tags: ["Performance", "Three.js", "Optimization"],
  },
  {
    id: 3,
    title: "Physics-Based Animation Systems for Modern Web Interfaces",
    conference: "IEEE VIS 2023",
    authors: "Your Name, et al.",
    year: "2023",
    link: "#",
    tags: ["Physics", "Animation", "GPU"],
  },
];

export function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".publication-item");

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-24"
      id="publications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-12 sm:mb-16 md:mb-24 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Publications
        </motion.h2>
      </div>

      <div className="space-y-0">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className={`publication-item border-b border-white/10 py-6 sm:py-7 md:py-8 transition-all duration-300 ${
              hoveredId === null
                ? ""
                : hoveredId === pub.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(pub.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-blue-400 text-xs sm:text-sm">
                    {pub.year}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 text-white">
                    {pub.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    {pub.conference} — {pub.authors}
                  </p>

                  <MagneticButton className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/20 rounded-full hover:border-blue-400/50 hover:bg-white/5 transition-all font-mono text-xs sm:text-sm">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      View Paper
                    </a>
                  </MagneticButton>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 rounded-full font-mono text-xs sm:text-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
