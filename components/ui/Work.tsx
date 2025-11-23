"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortalCursor } from "./PortalCursor";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Ethereal Commerce",
    description: "Next-gen e-commerce platform with immersive 3D product views",
    year: "2024",
    tags: ["WebGL", "Next.js", "Three.js"],
    preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  },
  {
    id: 2,
    title: "Quantum Portfolio",
    description: "Award-winning portfolio with particle physics interactions",
    year: "2024",
    tags: ["R3F", "GLSL", "Framer Motion"],
    preview: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
  },
  {
    id: 3,
    title: "Neural Gallery",
    description: "AI-powered art gallery with generative visuals",
    year: "2023",
    tags: ["WebGL", "TensorFlow.js", "React"],
    preview: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800",
  },
  {
    id: 4,
    title: "Void Interface",
    description: "Minimalist OS interface concept with fluid animations",
    year: "2023",
    tags: ["GSAP", "Next.js", "TypeScript"],
    preview: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
  },
];

export function Work() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const projectItems = sectionRef.current.querySelectorAll(".project-item");

    projectItems.forEach((item) => {
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
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen px-8 py-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-6xl md:text-8xl font-serif font-bold mb-24 text-gradient"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            Selected Work
          </motion.h2>

          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-item border-b border-white/10 py-8 hover:bg-white/5 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                    <span className="font-mono text-gray-500 text-sm">
                      {project.year}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h3 className="text-4xl md:text-6xl font-serif font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <div className="flex gap-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 border border-white/20 rounded-full font-mono text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortalCursor
        isActive={hoveredProject !== null}
        mediaUrl={
          projects.find((p) => p.id === hoveredProject)?.preview
        }
      />
    </>
  );
}
