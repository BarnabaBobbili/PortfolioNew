"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/**
 * GlowingName3D Component
 *
 * Displays your name in 3D with a cyberpunk "decode" effect where letters
 * scramble through random characters before settling into the final text.
 *
 * FEATURES:
 * - Decode/glitch text animation (Matrix-style)
 * - Each letter has a unique neon color
 * - GSAP entrance animations (scale, rotation, position, glow)
 * - Continuous floating motion for each letter
 * - Scroll-reactive (fades and moves away as you scroll)
 * - Emissive glow with subtle flicker effect
 *
 * LAYOUT: Two rows - first name (bigger), last name (smaller)
 * POSITION: Center of hero section, synced with HeroSection scroll animations
 */

// Cyberpunk color palette - each letter gets a color from this array
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

// Character sets for decode effect - randomly cycles through these
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&"; // Symbols
const TECH_CHARS = "01アイウエオカキクケコサシスセソタチツテト"; // Binary + Japanese katakana

// Get random character for scramble effect
function getRandomChar(): string {
  const chars = Math.random() > 0.5 ? GLITCH_CHARS : TECH_CHARS;
  return chars[Math.floor(Math.random() * chars.length)];
}

/**
 * Letter3D Component (internal)
 *
 * Individual 3D letter with decode animation, entrance effects, and floating motion.
 * Each letter independently animates and has unique randomized properties.
 */

interface Letter3DProps {
  targetChar: string; // The final character to display
  position: [number, number, number]; // 3D position
  color: string; // Neon color for this letter
  index: number; // Position in full name (for staggered animations)
  totalLetters: number;
  decodeDelay: number; // Delay before decode starts
  decodeSpeed: number; // Speed of character scrambling (ms per frame)
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
  const [displayChar, setDisplayChar] = useState(getRandomChar()); // Start with random char
  const [isDecoded, setIsDecoded] = useState(false); // Track if decode is complete

  // Random values for unique animation per letter - ensures each letter moves differently
  const randomOffset = useMemo(() => ({
    phase: Math.random() * Math.PI * 2, // Random starting phase for sine waves
    speedX: 0.3 + Math.random() * 0.2, // Floating speed variations
    speedY: 0.4 + Math.random() * 0.3,
    speedZ: 0.2 + Math.random() * 0.2,
    amplitudeX: 0.02 + Math.random() * 0.02, // Movement range
    amplitudeY: 0.03 + Math.random() * 0.02,
    amplitudeZ: 0.01 + Math.random() * 0.01,
    flickerSpeed: 5 + Math.random() * 10, // Glow flicker rate
  }), []);

  // Initial animation state (letters start hidden, then animate in)
  const initialState = useRef({
    scale: 0, // Start invisible
    rotationZ: (Math.random() - 0.5) * Math.PI * 2, // Random spin
    positionZ: -5, // Start further back
    emissiveIntensity: 0, // No glow initially
  });

  // === DECODE EFFECT ===
  // Scrambles through random characters before revealing the final letter
  useEffect(() => {
    // Spaces don't need decoding
    if (targetChar === " ") {
      setDisplayChar(" ");
      setIsDecoded(true);
      return;
    }

    let frameCount = 0;
    const totalFrames = 15 + Math.random() * 10; // Random duration (15-25 frames)

    // Stagger start time based on letter index for wave effect
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        frameCount++;

        // Gradually increase chance of showing correct letter as we near the end
        if (frameCount > totalFrames * 0.7 && Math.random() < 0.3) {
          setDisplayChar(targetChar); // Tease the final character
        } else if (frameCount < totalFrames) {
          setDisplayChar(getRandomChar()); // Still scrambling
        } else {
          // Decode complete - lock in final character
          setDisplayChar(targetChar);
          setIsDecoded(true);
          clearInterval(interval);
        }
      }, decodeSpeed); // Execute every decodeSpeed milliseconds

      return () => clearInterval(interval);
    }, decodeDelay + index * 80); // Each letter starts 80ms after the previous one

    return () => clearTimeout(startDelay);
  }, [targetChar, index, decodeDelay, decodeSpeed]);

  // === GSAP ENTRANCE ANIMATION ===
  // Letters scale in, rotate, fly forward, and glow up on mount
  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    const mesh = meshRef.current;
    const material = materialRef.current;

    // Set initial hidden state
    mesh.scale.setScalar(0); // Invisible
    mesh.rotation.z = initialState.current.rotationZ; // Random rotation
    mesh.position.z = position[2] - 5; // Behind starting position
    material.emissiveIntensity = 0; // No glow

    const staggerDelay = index * 0.06; // Stagger animations across letters
    const baseDelay = 3.5; // Match DecodeText timing exactly
    const delay = baseDelay + staggerDelay;

    // Animate in - synchronized with decode start
    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.6,
      delay: delay,
      ease: "back.out(1.7)",
    });

    gsap.to(mesh.rotation, {
      z: 0,
      duration: 0.5,
      delay: delay,
      ease: "power3.out",
    });

    gsap.to(mesh.position, {
      z: position[2],
      duration: 0.6,
      delay: delay,
      ease: "power2.out",
    });

    // Emissive flare then settle
    gsap.to(material, {
      emissiveIntensity: 5,
      duration: 0.3,
      delay: delay + 0.2,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(material, {
          emissiveIntensity: 3.5,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  }, [index, position]);

  // === CONTINUOUS FLOATING ANIMATION ===
  // Runs every frame to create organic movement
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    const { phase, speedX, speedY, amplitudeX, amplitudeY, flickerSpeed } = randomOffset;

    // Floating motion using sine waves (each letter floats uniquely)
    meshRef.current.position.x = position[0] + Math.sin(time * speedX + phase) * amplitudeX;
    meshRef.current.position.y = position[1] + Math.cos(time * speedY + phase) * amplitudeY;

    // Gentle rotation wobble for organic feel
    meshRef.current.rotation.x = Math.sin(time * 0.5 + phase) * 0.02;
    meshRef.current.rotation.y = Math.cos(time * 0.4 + phase) * 0.02;

    // Glow flicker effect (more intense during decode, subtle after)
    const flickerIntensity = isDecoded ? 0.15 : 0.3;
    const flicker = 1 + Math.sin(time * flickerSpeed) * flickerIntensity + Math.random() * 0.05;
    if (materialRef.current.emissiveIntensity > 0.5) {
      materialRef.current.emissiveIntensity = 3.5 * flicker; // Pulse the glow
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
        emissiveIntensity={3.5}
        metalness={0.8}
        roughness={0.2}
        toneMapped={false}
      />
    </Text>
  );
}

/**
 * Main GlowingName3D Export Component
 *
 * Orchestrates all letters and handles scroll-based animations.
 * This is the component you add to SceneCanvas.
 */

interface GlowingName3DProps {
  firstName?: string; // Default: "BARNABA"
  lastName?: string; // Default: "BOBBILI"
  position?: [number, number, number]; // 3D position
  decodeDelay?: number; // Delay before decode starts (ms)
  decodeSpeed?: number; // Speed of character cycling (ms per frame)
}

export function GlowingName3D({
  firstName = "BARNABA",
  lastName = "BOBBILI",
  position = [0, 0.5, 0],
  decodeDelay = 3500, // Start after loading screen completes (3000ms + 500ms buffer)
  decodeSpeed = 50,
}: GlowingName3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Initialize scroll progress based on current position (handles page refresh on other sections)
  const [scrollProgress, setScrollProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      return Math.min(scrollY / windowHeight, 1);
    }
    return 0;
  });

  // Responsive scaling and positioning based on viewport width
  const [responsiveScale, setResponsiveScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 380) return 0.18; // Extra small mobile
      if (width < 480) return 0.22; // Small mobile
      if (width < 640) return 0.28; // Mobile
      if (width < 768) return 0.38; // Large mobile
      if (width < 1024) return 0.55; // Tablet
      if (width < 1280) return 0.75; // Small desktop
      return 1; // Large desktop
    }
    return 1;
  });

  // Responsive Y position adjustment for better centering on mobile
  const [responsiveYOffset, setResponsiveYOffset] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 0.3; // Move up slightly on mobile
      if (width < 768) return 0.2; // Move up a bit on large mobile
      return 0; // No offset on larger screens
    }
    return 0;
  });

  // === SCROLL TRACKING ===
  // Monitor scroll position to sync with HeroSection animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Progress goes from 0 to 1 as we scroll through the hero section
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    // Set initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === RESPONSIVE SCALING ===
  // Update scale and position when window resizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setResponsiveScale(0.18); // Extra small mobile
        setResponsiveYOffset(0.3);
      } else if (width < 480) {
        setResponsiveScale(0.22); // Small mobile
        setResponsiveYOffset(0.3);
      } else if (width < 640) {
        setResponsiveScale(0.28); // Mobile
        setResponsiveYOffset(0.3);
      } else if (width < 768) {
        setResponsiveScale(0.38); // Large mobile
        setResponsiveYOffset(0.2);
      } else if (width < 1024) {
        setResponsiveScale(0.55); // Tablet
        setResponsiveYOffset(0);
      } else if (width < 1280) {
        setResponsiveScale(0.75); // Small desktop
        setResponsiveYOffset(0);
      } else {
        setResponsiveScale(1); // Large desktop
        setResponsiveYOffset(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // === SCROLL ANIMATIONS ===
  // Move name away and fade out as user scrolls (matches HeroSection behavior)
  useFrame(() => {
    if (!groupRef.current) return;

    // Only show name when in hero section (scrollProgress between 0 and 1)
    const isInHeroSection = scrollProgress < 1;
    groupRef.current.visible = isInHeroSection;

    if (isInHeroSection) {
      // Push into background (3D depth effect)
      groupRef.current.position.z = position[2] - scrollProgress * 8;
      // Apply responsive Y offset for better mobile centering
      groupRef.current.position.y = position[1] + responsiveYOffset - scrollProgress * 2;
      groupRef.current.rotation.x = -scrollProgress * 0.3;

      // Shrink as it moves away, combined with responsive scaling
      const scrollScale = 1 - scrollProgress * 0.3;
      const finalScale = Math.max(scrollScale, 0) * responsiveScale;
      groupRef.current.scale.setScalar(finalScale);
    }
  });

  // Calculate letter positions
  const letters = useMemo(() => {
    const result: { char: string; position: [number, number, number]; color: string; index: number; isSecondRow: boolean; fontSize: number }[] = [];
    const firstNameLetterSpacing = 1.5;
    const lastNameLetterSpacing = 1.25; // Adjusted for smaller font size
    const rowSpacing = 2.0;

    // First name - bigger font
    const firstNameWidth = firstName.length * firstNameLetterSpacing;
    const firstNameStartX = -firstNameWidth / 2 + firstNameLetterSpacing / 2;

    firstName.split("").forEach((char, i) => {
      result.push({
        char,
        position: [
          position[0] + firstNameStartX + i * firstNameLetterSpacing,
          position[1] + rowSpacing / 2 + 0.3,
          position[2]
        ],
        color: NEON_COLORS[i % NEON_COLORS.length],
        index: i,
        isSecondRow: false,
        fontSize: 2.6,
      });
    });

    // Last name - smaller font with adjusted spacing
    const lastNameWidth = lastName.length * lastNameLetterSpacing;
    const lastNameStartX = -lastNameWidth / 2 + lastNameLetterSpacing / 2;

    lastName.split("").forEach((char, i) => {
      result.push({
        char,
        position: [
          position[0] + lastNameStartX + i * lastNameLetterSpacing,
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
