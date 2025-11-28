"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    id: 1,
    degree: "M.Tech in Computer Science and Engineering",
    institution: "Amrita Vishwa Vidhyapeetam",
    location: "Coimbatore",
    period: "2025 - Present",
    tags: ["Advanced Algorithms", "Cloud Computing", "Research"],
  },
  {
    id: 2,
    degree: "B.E in Computer Science and Engineering (AI & ML)",
    institution: "Sathyabama Institute of Science and Technology",
    location: "Chennai",
    period: "2021 - 2025",
    tags: ["Artificial Intelligence", "Machine Learning", "CGPA: 7.47"],
  },
];


export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".education-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 20%",
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
      id="education"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-12 sm:mb-16 md:mb-24 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
      </div>

      <div className="space-y-0">
        {education.map((edu) => (
          <div
            key={edu.id}
            className={`education-item border-b border-white/10 py-6 sm:py-7 md:py-8 transition-all duration-500 ease-out ${
              hoveredId === null
                ? ""
                : hoveredId === edu.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(edu.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-cyan-400 text-xs sm:text-sm">
                    {edu.period.split(" - ")[1]}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg">
                    {edu.institution} — {edu.location}
                  </p>
                  <p className="text-cyan-300 text-xs sm:text-sm font-mono mt-1">
                    {edu.period}
                  </p>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {edu.tags.map((tag) => (
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
