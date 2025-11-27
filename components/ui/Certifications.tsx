"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { id: 1, name: "AWS Certified Solutions Architect", year: "2023" },
  { id: 2, name: "Google Cloud Professional Developer", year: "2023" },
  { id: 3, name: "Three.js Journey - Complete Course", year: "2022" },
  { id: 4, name: "Advanced WebGL & GLSL Shaders", year: "2022" },
];

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".certification-item");

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
      id="certifications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-12 sm:mb-16 md:mb-24 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.h2>
      </div>

      <div className="space-y-0">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`certification-item border-b border-white/10 py-6 sm:py-7 md:py-8 transition-all duration-300 ${
              hoveredId === null
                ? ""
                : hoveredId === cert.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-blue-400 text-xs sm:text-sm">
                    {cert.year}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-white">
                    {cert.name}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg">
                    Professional Certification
                  </p>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-400/50 bg-blue-500/10 rounded-full font-mono text-xs sm:text-sm text-blue-300">
                      Certified
                    </span>
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
