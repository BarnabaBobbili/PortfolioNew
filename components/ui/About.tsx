"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const paragraphs = contentRef.current.querySelectorAll("p");
    gsap.fromTo(
      paragraphs,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-8 py-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-serif font-bold mb-16 text-gradient"
        >
          About
        </motion.h2>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              I'm a creative technologist specializing in immersive web
              experiences that blur the line between art and engineering.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              With expertise in WebGL, Three.js, and modern frontend
              frameworks, I craft digital experiences that captivate and
              inspire.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-mono font-semibold mb-6 text-white">
              Expertise
            </h3>
            <ul className="space-y-3 font-mono text-gray-400">
              {[
                "WebGL & Three.js",
                "React & Next.js",
                "GLSL Shaders",
                "Creative Coding",
                "3D Animation",
                "Interactive Design",
              ].map((skill, i) => (
                <motion.li
                  key={skill}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-white rounded-full" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
