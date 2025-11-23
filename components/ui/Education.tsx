"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2020 - 2022",
    tags: ["Computer Graphics", "HCI", "Machine Learning"],
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2016 - 2020",
    tags: ["Software Engineering", "Mathematics", "Algorithms"],
  },
];

const certifications = [
  { id: 3, name: "AWS Certified Solutions Architect", year: "2023" },
  { id: 4, name: "Google Cloud Professional Developer", year: "2023" },
  { id: 5, name: "Three.js Journey - Complete Course", year: "2022" },
  { id: 6, name: "Advanced WebGL & GLSL Shaders", year: "2022" },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".education-item");

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
      className="relative min-h-screen py-24"
      id="education"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-6xl md:text-8xl font-serif font-bold mb-24 text-gradient"
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
            className={`education-item border-b border-white/10 py-8 transition-all duration-300 ${
              hoveredId === null
                ? ""
                : hoveredId === edu.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(edu.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-blue-400 text-sm">
                    {edu.period.split(" - ")[1]}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-200 text-lg">
                    {edu.institution} — {edu.location}
                  </p>
                  <p className="text-blue-300 text-sm font-mono mt-1">
                    {edu.period}
                  </p>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-3 flex-wrap">
                    {edu.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 border border-white/30 rounded-full font-mono text-sm text-white"
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

        {/* Certifications */}
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`education-item border-b border-white/10 py-8 transition-all duration-300 ${
              hoveredId === null
                ? ""
                : hoveredId === cert.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-blue-400 text-sm">
                    {cert.year}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    {cert.name}
                  </h3>
                  <p className="text-gray-200 text-lg">
                    Professional Certification
                  </p>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-3 flex-wrap">
                    <span className="px-4 py-2 border border-blue-400/50 bg-blue-500/10 rounded-full font-mono text-sm text-blue-300">
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
