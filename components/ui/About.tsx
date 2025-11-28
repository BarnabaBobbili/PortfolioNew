"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-8 sm:mb-12 md:mb-16 text-gradient"
        >
          About
        </motion.h2>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <div>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Hardworking and eager to learn, with a solid foundation in programming and computer systems.
              Willing to put in the effort to take on challenges and improve continuously.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Currently pursuing M.Tech in Computer Science and Engineering at Amrita Vishwa Vidhyapeetam,
              with a passion for building secure, scalable applications and exploring cutting-edge technologies.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-mono font-semibold mb-4 sm:mb-5 md:mb-6 text-white">
              Core Competencies
            </h3>
            <ul className="space-y-2 sm:space-y-3 font-mono text-sm sm:text-base text-gray-200">
              {[
                "Full-Stack Development",
                "Multi-Modal Security Systems",
                "Machine Learning & AI",
                "Cloud Technologies (AWS, Azure)",
                "Database Management",
                "Version Control & DevOps",
              ].map((skill, i) => (
                <motion.li
                  key={skill}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          className="mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <MagneticButton className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-void font-mono font-medium text-sm sm:text-base rounded-full hover:shadow-2xl hover:shadow-white/20 transition-shadow">
            <a href={process.env.NEXT_PUBLIC_BLOG_URL || "#"} target="_blank" rel="noopener noreferrer">
              My Blog
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
