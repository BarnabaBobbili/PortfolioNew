"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills Section Component
 *
 * Clean, list-based skills display matching the Work/Publications pattern.
 * Skills grouped by category with hover interactions and smooth animations.
 *
 * STRUCTURE:
 * - Horizontal list items with category labels
 * - 12-column grid layout (consistent with Work section)
 * - Hover states with selective opacity
 * - GSAP scroll-triggered entrance animations
 * - Tag-based skill display with proficiency indicators
 */

const skillCategories = [
  {
    id: 1,
    category: "Frontend",
    label: "UI/UX",
    skills: [
      "React",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Responsive Design",
      "Accessibility",
    ],
    proficiency: "Expert",
  },
  {
    id: 2,
    category: "3D & Graphics",
    label: "WebGL",
    skills: [
      "Three.js",
      "React Three Fiber",
      "GLSL Shaders",
      "WebGL",
      "Blender",
      "Post-Processing",
      "Particle Systems",
    ],
    proficiency: "Advanced",
  },
  {
    id: 3,
    category: "Backend & DevOps",
    label: "Infra",
    skills: [
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "Git",
      "CI/CD",
      "Performance Optimization",
    ],
    proficiency: "Proficient",
  },
  {
    id: 4,
    category: "Design & Tools",
    label: "Tools",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "Prototyping",
      "User Research",
      "Design Systems",
      "UI Animation",
    ],
    proficiency: "Advanced",
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const skillItems = sectionRef.current.querySelectorAll(".skill-item");

    skillItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 100,
        },
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
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 sm:mb-5 md:mb-6 text-gradient">
            Technical Skills
          </h2>
          <p className="font-mono text-gray-400 text-sm sm:text-base md:text-lg">
            <span className="text-cyan-400">[SYSTEM.STACK]</span> Core
            competencies and technologies
          </p>
        </motion.div>
      </div>

      <div className="space-y-0">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className={`skill-item border-b border-white/10 py-6 sm:py-7 md:py-8 transition-all duration-300 ${
              hoveredId === null
                ? ""
                : hoveredId === category.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                {/* Category Label */}
                <div className="md:col-span-2">
                  <span className="font-mono text-blue-400 text-xs sm:text-sm">
                    {category.label}
                  </span>
                </div>

                {/* Category Title & Proficiency */}
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 sm:mb-3 text-white">
                    {category.category}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 border border-green-400/50 text-green-300 rounded-full font-mono text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    {category.proficiency}
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="md:col-span-6">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 rounded-full font-mono text-xs sm:text-sm text-white hover:border-blue-400/50 hover:bg-white/5 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12 sm:mt-14 md:mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-mono text-xs sm:text-sm text-gray-500 text-center"
        >
          <span className="text-cyan-400">[STATUS]</span> Continuously learning
          and exploring new technologies
        </motion.div>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="absolute top-8 sm:top-10 md:top-12 left-4 sm:left-8 md:left-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-l-2 border-t-2 border-blue-300/20 hidden md:block" />
      <div className="absolute top-8 sm:top-10 md:top-12 right-4 sm:right-8 md:right-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-r-2 border-t-2 border-blue-300/20 hidden md:block" />
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-4 sm:left-8 md:left-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-l-2 border-b-2 border-blue-300/20 hidden md:block" />
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 right-4 sm:right-8 md:right-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-r-2 border-b-2 border-blue-300/20 hidden md:block" />
    </section>
  );
}
