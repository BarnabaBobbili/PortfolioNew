"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    id: 1,
    title: "Neural Rendering Techniques for Real-Time Web Applications",
    conference: "SIGGRAPH 2024",
    authors: "Your Name, et al.",
    year: "2024",
    link: "#",
    doi: "10.1145/example.123456",
    abstract: "Novel approach to real-time neural rendering in browser environments using WebGL 2.0",
  },
  {
    id: 2,
    title: "Optimizing Three.js Performance for Large-Scale Interactive Experiences",
    conference: "ACM CHI 2024",
    authors: "Your Name, Co-Author",
    year: "2024",
    link: "#",
    doi: "10.1145/example.789012",
    abstract: "Performance optimization strategies for complex 3D web applications",
  },
  {
    id: 3,
    title: "Physics-Based Animation Systems for Modern Web Interfaces",
    conference: "IEEE VIS 2023",
    authors: "Your Name, et al.",
    year: "2023",
    link: "#",
    doi: "10.1109/example.345678",
    abstract: "Implementation of GPU-accelerated physics simulations in web environments",
  },
];

export function Publications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".publication-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.1,
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
      className="relative min-h-screen px-8 py-24"
      id="publications"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-6xl md:text-8xl font-serif font-bold mb-16 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Research & Publications
        </motion.h2>

        <div className="space-y-8">
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              className="publication-item border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:border-blue-400/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="font-mono text-2xl font-bold text-white">
                      {pub.year.slice(2)}
                    </span>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                    {pub.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-mono">
                      {pub.conference}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-mono">
                      {pub.authors}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {pub.abstract}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={pub.link}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:border-blue-400/50 hover:bg-white/5 transition-all font-mono text-sm"
                    >
                      <svg
                        className="w-4 h-4"
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
                      PDF
                    </a>
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-gray-400 font-mono text-sm">
                      DOI: {pub.doi}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
