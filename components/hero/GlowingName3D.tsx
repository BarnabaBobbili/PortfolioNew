"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Cyberpunk color palette for each letter
const NEON_COLORS = [
  "#00FFFF", // Electric Cyan
  "#FF00FF", // Plasma Magenta
  "#39FF14", // Neon Lime
  "#BF00FF", // Ultraviolet
  "#FF3131", // Neon Red
  "#00FF7F", // Spring Green
  "#FF6EC7", // Hot Pink
  "#FFFF00", // Electric Yellow
  "#7DF9FF", // Electric Blue
  "#FF5F1F", // Neon Orange
];

// Decode effect characters
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";
const TECH_CHARS = "01アイウエオカキクケコサシスセソタチツテト";

function getRandomChar(): string {
  const chars = Math.random() > 0.5 ? GLITCH_CHARS : TECH_CHARS;
  return chars[Math.floor(Math.random() * chars.length)];
}

interface Letter3DProps {
  targetChar: string;
  position: [number, number, number];
  color: string;
  index: number;
  totalLetters: number;
  decodeDelay: number;
  decodeSpeed: number;
  fontSize: number;
}

function Letter3D({
  targetChar,
  position,
  color,
  index,
  decodeDelay,
  decodeSpeed,
  fontSize
}: Letter3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [displayChar, setDisplayChar] = useState(getRandomChar());
  const [isDecoded, setIsDecoded] = useState(false);

  // Random values for unique animation per letter
  const randomOffset = useMemo(() => ({
    phase: Math.random() * Math.PI * 2,
    speedX: 0.3 + Math.random() * 0.2,
    speedY: 0.4 + Math.random() * 0.3,
    speedZ: 0.2 + Math.random() * 0.2,
    amplitudeX: 0.02 + Math.random() * 0.02,
    amplitudeY: 0.03 + Math.random() * 0.02,
    amplitudeZ: 0.01 + Math.random() * 0.01,
    flickerSpeed: 5 + Math.random() * 10,
  }), []);

  // Initial animation state
  const initialState = useRef({
    scale: 0,
    rotationZ: (Math.random() - 0.5) * Math.PI * 2,
    positionZ: -5,
    emissiveIntensity: 0,
  });

  // Decode effect - scramble then resolve
  useEffect(() => {
    if (targetChar === " ") {
      setDisplayChar(" ");
      setIsDecoded(true);
      return;
    }

    let frameCount = 0;
    const totalFrames = 15 + Math.random() * 10; // Random number of scrambles

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        frameCount++;

        // Randomly show target char or glitch char
        if (frameCount > totalFrames * 0.7 && Math.random() < 0.3) {
          setDisplayChar(targetChar);
        } else if (frameCount < totalFrames) {
          setDisplayChar(getRandomChar());
        } else {
          // Final state - show target char
          setDisplayChar(targetChar);
          setIsDecoded(true);
          clearInterval(interval);
        }
      }, decodeSpeed);

      return () => clearInterval(interval);
    }, decodeDelay + index * 80);

    return () => clearTimeout(startDelay);
  }, [targetChar, index, decodeDelay, decodeSpeed]);

  // GSAP entrance animation
  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    const mesh = meshRef.current;
    const material = materialRef.current;

    // Set initial state
    mesh.scale.setScalar(0);
    mesh.rotation.z = initialState.current.rotationZ;
    mesh.position.z = position[2] - 5;
    material.emissiveIntensity = 0;

    const delay = index * 0.06;

    // Animate in
    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.8,
      delay: delay + 0.3,
      ease: "back.out(1.7)",
    });

    gsap.to(mesh.rotation, {
      z: 0,
      duration: 0.6,
      delay: delay + 0.3,
      ease: "power3.out",
    });

    gsap.to(mesh.position, {
      z: position[2],
      duration: 0.8,
      delay: delay + 0.3,
      ease: "power2.out",
    });

    // Emissive flare then settle
    gsap.to(material, {
      emissiveIntensity: 4,
      duration: 0.3,
      delay: delay + 0.6,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(material, {
          emissiveIntensity: 2.5,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  }, [index, position]);

  // Continuous floating animation and flicker
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    const { phase, speedX, speedY, amplitudeX, amplitudeY, flickerSpeed } = randomOffset;

    // Subtle floating motion
    meshRef.current.position.x = position[0] + Math.sin(time * speedX + phase) * amplitudeX;
    meshRef.current.position.y = position[1] + Math.cos(time * speedY + phase) * amplitudeY;

    // Subtle rotation wobble
    meshRef.current.rotation.x = Math.sin(time * 0.5 + phase) * 0.02;
    meshRef.current.rotation.y = Math.cos(time * 0.4 + phase) * 0.02;

    // Enhanced flicker during decode, subtle after
    const flickerIntensity = isDecoded ? 0.1 : 0.3;
    const flicker = 1 + Math.sin(time * flickerSpeed) * flickerIntensity + Math.random() * 0.05;
    if (materialRef.current.emissiveIntensity > 0.5) {
      materialRef.current.emissiveIntensity = 2.5 * flicker;
    }
  });

  if (targetChar === " ") return null;

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      anchorX="center"
      anchorY="middle"
      letterSpacing={-0.02}
      fontWeight="bold"
    >
      {displayChar}
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        metalness={0.8}
        roughness={0.2}
        toneMapped={false}
      />
    </Text>
  );
}

interface GlowingName3DProps {
  firstName?: string;
  lastName?: string;
  position?: [number, number, number];
  decodeDelay?: number;
  decodeSpeed?: number;
}

export function GlowingName3D({
  firstName = "BARNABA",
  lastName = "BOBBILI",
  position = [0, 0.5, 0],
  decodeDelay = 500,
  decodeSpeed = 50,
}: GlowingName3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll to animate name with hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Progress goes from 0 to 1 as we scroll through the hero section
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate group based on scroll
  useFrame(() => {
    if (!groupRef.current) return;

    // Push the name into the background as user scrolls (matching hero content behavior)
    groupRef.current.position.z = position[2] - scrollProgress * 8;
    groupRef.current.position.y = position[1] - scrollProgress * 2;
    groupRef.current.rotation.x = -scrollProgress * 0.3;

    // Scale down slightly
    const scale = 1 - scrollProgress * 0.3;
    groupRef.current.scale.setScalar(Math.max(scale, 0));

    // Fade out by reducing visibility
    groupRef.current.visible = scrollProgress < 0.95;
  });

  // Calculate letter positions
  const letters = useMemo(() => {
    const result: { char: string; position: [number, number, number]; color: string; index: number; isSecondRow: boolean; fontSize: number }[] = [];
    const letterSpacing = 1.5;
    const rowSpacing = 2.8;

    // First name - bigger font
    const firstNameWidth = firstName.length * letterSpacing;
    const firstNameStartX = -firstNameWidth / 2 + letterSpacing / 2;

    firstName.split("").forEach((char, i) => {
      result.push({
        char,
        position: [
          position[0] + firstNameStartX + i * letterSpacing,
          position[1] + rowSpacing / 2 + 0.3,
          position[2]
        ],
        color: NEON_COLORS[i % NEON_COLORS.length],
        index: i,
        isSecondRow: false,
        fontSize: 2.6,
      });
    });

    // Last name - smaller font
    const lastNameWidth = lastName.length * letterSpacing;
    const lastNameStartX = -lastNameWidth / 2 + letterSpacing / 2;

    lastName.split("").forEach((char, i) => {
      result.push({
        char,
        position: [
          position[0] + lastNameStartX + i * letterSpacing,
          position[1] - rowSpacing / 2 + 0.3,
          position[2]
        ],
        color: NEON_COLORS[(i + firstName.length) % NEON_COLORS.length],
        index: i + firstName.length,
        isSecondRow: true,
        fontSize: 2.2,
      });
    });

    return result;
  }, [firstName, lastName, position]);

  return (
    <group ref={groupRef}>
      {letters.map((letter, i) => (
        <Letter3D
          key={`${letter.char}-${i}`}
          targetChar={letter.char}
          position={letter.position}
          color={letter.color}
          index={letter.index}
          totalLetters={letters.length}
          decodeDelay={letter.isSecondRow ? decodeDelay + 400 : decodeDelay}
          decodeSpeed={decodeSpeed}
          fontSize={letter.fontSize}
        />
      ))}
    </group>
  );
}
