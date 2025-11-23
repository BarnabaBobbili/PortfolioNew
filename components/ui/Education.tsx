"use client";

import { useEffect, useRef } from "react";
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
    gpa: "3.9/4.0",
    focus: "Computer Graphics & Human-Computer Interaction",
    achievements: [
      "Dean's List all semesters",
      "Graduate Research Assistant - Interactive 3D Graphics Lab",
      "Published 2 papers on real-time rendering techniques",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2016 - 2020",
    gpa: "3.8/4.0",
    focus: "Software Engineering & Mathematics",
    achievements: [
      "Summa Cum Laude",
      "ACM ICPC Regional Finalist",
      "Teaching Assistant for Advanced Algorithms",
    ],
  },
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "Three.js Journey - Complete Course",
  "Advanced WebGL & GLSL Shaders",
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".education-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
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
      id="education"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-6xl md:text-8xl font-serif font-bold mb-16 text-gradient"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="space-y-8 mb-16">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              className="education-item relative border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:border-blue-400/30 transition-all"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-blue-500 border-4 border-void" />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xl text-blue-300 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 mb-3">
                    {edu.location} • {edu.period}
                  </p>

                  <div className="flex gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-mono">
                      GPA: {edu.gpa}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                      {edu.focus}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {edu.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-8"
        >
          <h3 className="text-3xl font-serif font-bold text-white mb-6">
            Certifications & Professional Development
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border border-white/10 rounded-lg hover:border-blue-400/30 transition-all"
              >
                <svg
                  className="w-6 h-6 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
