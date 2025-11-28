"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Canteen Delight",
    description: "A sophisticated full-stack canteen ecosystem that transforms food service operations through intelligent automation. Seamlessly orchestrates order management, real-time inventory tracking with smart expiry alerts, dynamic supplier coordination, and comprehensive payment processing. Features granular role-based access control across multiple user hierarchies, live analytics dashboards with visual insights, and end-to-end activity audit trails—all powered by a robust MERN architecture with JWT authentication.",
    year: "2024",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    preview: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    github: "https://github.com/BarnabaBobbili/Canteen-FSD",
    live: "https://github.com/BarnabaBobbili/Canteen-FSD",
  },
  {
    id: 2,
    title: "God-Tier Personal Blog",
    description: "An immersive content platform engineered with Next.js 15's cutting-edge App Router and Server Actions, powered by Supabase's PostgreSQL infrastructure. Features a sophisticated Notion-style editor with drag-and-drop media uploads, threaded comment discussions with optimistic UI rendering, and row-level security authentication. Showcases premium Aceternity and Magic UI components including cursor-following spotlight effects, animated scroll trackers, and 3D wobble animations—all wrapped in a responsive dark theme with real-time admin dashboard.",
    year: "2024",
    tags: ["Next.js 15", "Supabase", "TypeScript", "Tailwind CSS"],
    preview: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Sentinel Auth",
    description: "Enterprise-grade Zero Trust authentication platform featuring tri-modal biometric verification through facial recognition, voice analysis, and behavioral profiling. Implements privacy-first architecture where raw biometric data never persists—only mathematical embeddings stored in vector databases. Built entirely with FOSS technologies including DeepFace, SpeechBrain, and MediaPipe for client-side liveness detection. Features dynamic trust scoring, policy-as-code authorization via OPA, and OIDC integration with ZITADEL—orchestrated through containerized microservices.",
    year: "2024",
    tags: ["FastAPI", "Next.js", "MediaPipe", "Docker"],
    preview: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "Ethereal Commerce",
    description: "Next-gen e-commerce platform with immersive 3D product views",
    year: "2024",
    tags: ["WebGL", "Next.js", "Three.js"],
    preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    github: "https://github.com/yourusername/ethereal-commerce",
    live: "https://ethereal-commerce.demo.com",
  },
  {
    id: 5,
    title: "Quantum Portfolio",
    description: "Award-winning portfolio with particle physics interactions",
    year: "2024",
    tags: ["R3F", "GLSL", "Framer Motion"],
    preview: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    github: "https://github.com/yourusername/quantum-portfolio",
    live: "https://quantum-portfolio.demo.com",
  },
  {
    id: 6,
    title: "Neural Gallery",
    description: "AI-powered art gallery with generative visuals",
    year: "2023",
    tags: ["WebGL", "TensorFlow.js", "React"],
    preview: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800",
    github: "https://github.com/yourusername/neural-gallery",
    live: "https://neural-gallery.demo.com",
  },
  {
    id: 7,
    title: "Void Interface",
    description: "Minimalist OS interface concept with fluid animations",
    year: "2023",
    tags: ["GSAP", "Next.js", "TypeScript"],
    preview: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    github: "https://github.com/yourusername/void-interface",
    live: "https://void-interface.demo.com",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const projectItems = sectionRef.current.querySelectorAll(".project-item");

    projectItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
        },
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
      id="work"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-12 sm:mb-16 md:mb-24 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Selected Work
        </motion.h2>
      </div>

      <div className="space-y-0">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-item border-b border-white/10 py-6 sm:py-7 md:py-8 transition-all duration-500 ease-out ${
              hoveredId === null
                ? ""
                : hoveredId === project.id
                ? "bg-white/10"
                : "opacity-30"
            }`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Title - Full Width */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 text-white">
                {project.title}
              </h3>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start md:items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-cyan-400 text-xs sm:text-sm">
                    {project.year}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <MagneticButton
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/20 rounded-full hover:border-cyan-400/50 hover:bg-white/5 transition-all font-mono text-xs sm:text-sm"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </a>
                    </MagneticButton>
                    <MagneticButton
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-full hover:bg-cyan-500/30 transition-all font-mono text-xs sm:text-sm"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="hidden xs:inline">Live Demo</span>
                        <span className="xs:hidden">Demo</span>
                      </a>
                    </MagneticButton>
                  </div>
                </div>

                <div className="md:col-span-6">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {project.tags.map((tag) => (
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
