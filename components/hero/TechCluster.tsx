"use client";

import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, Stars } from "@react-three/drei";
import SkillCard from "./SkillCard";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * TechCluster Component
 *
 * Zero-gravity debris field of skill cards with "Big Bang" entrance effect.
 * Skills explode from a singularity on scroll, then drift gently in 3D space.
 *
 * FEATURES:
 * - GSAP ScrollTrigger "explosion" effect from scale 0 to 1
 * - Spherical distribution using fibonacci spiral algorithm
 * - Mouse parallax rotation for interactivity
 * - Float animation for organic drift
 * - Frosted glass cards with edge glow
 * - Environment lighting and star field background
 *
 * @param containerRef - Reference to DOM container for ScrollTrigger
 */

const SKILLS = [
  "React",
  "Next.js 14",
  "TypeScript",
  "WebGL",
  "Three.js",
  "GSAP",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "Blender",
  "GLSL",
  "Python",
  "Docker",
  "Git",
  "Figma",
];

// Generates spherical coordinates using fibonacci spiral
const generatePosition = (index: number, total: number) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 6;

  return [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi),
  ] as [number, number, number];
};

interface TechClusterProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export function TechCluster({ containerRef }: TechClusterProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // === THE EXPLOSION ANIMATION (GSAP ScrollTrigger) ===
  useLayoutEffect(() => {
    if (!containerRef?.current || !groupRef.current) return;

    const ctx = gsap.context(() => {
      // "Big Bang" Timeline - cluster explodes from singularity
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when top of section hits bottom of viewport
          end: "center center", // End when center of section hits center of viewport
          scrub: 1, // Smooth scroll-linked animation
        },
      });

      // Explode from zero scale to full size
      tl.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 }, // Start at singularity
        { x: 1, y: 1, z: 1, ease: "power3.out", duration: 1.5 } // Explode out
      );

      // Add rapid spin during entrance for kinetic energy
      tl.fromTo(
        groupRef.current.rotation,
        { y: -Math.PI * 2 }, // Start spun back
        { y: 0, ease: "power2.out", duration: 1.5 },
        "<" // Run at same time as scale
      );
    });

    return () => ctx.revert(); // Cleanup
  }, [containerRef]);

  // === IDLE DRIFT (Mouse Parallax) ===
  useFrame((state) => {
    if (!groupRef.current) return;

    const { x, y } = state.pointer;

    // Mouse influence - cluster rotates to follow cursor
    const targetRotationX = y * 0.2;
    const targetRotationY = x * 0.2;

    // Smoothly interpolate to target rotation (lerp)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.1
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.1
    );
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={2} />

      {/* Environment map for realistic reflections */}
      <Environment preset="city" />

      {/* Star field background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main cluster group */}
      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <Float
            key={i}
            speed={2} // Float animation speed
            rotationIntensity={2} // How much cards rotate while floating
            floatIntensity={2} // How much cards move up/down
          >
            <SkillCard text={skill} position={generatePosition(i, SKILLS.length)} />
          </Float>
        ))}
      </group>
    </>
  );
}
