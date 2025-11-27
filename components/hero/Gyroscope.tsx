"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gyroscope Component
 *
 * A precision-engineered holographic gimbal system with three concentric rings.
 * Skills orbit as holographic projections along the rings like electrons around a nucleus.
 *
 * FEATURES:
 * - Three concentric TorusGeometry rings (inner, middle, outer)
 * - Brushed titanium material with glowing energy seam
 * - Fresnel rim lighting on ring edges
 * - Skills distributed along ring circumferences with billboarding
 * - Perpetual rotation on different axes (X, Y, Z)
 * - GSAP ScrollTrigger "vault lock" effect - rings align and expand
 * - Speed up on scroll/hover
 * - Heavy bloom post-processing on text and ring edges
 *
 * @param containerRef - Reference to DOM container for ScrollTrigger
 */

const SKILLS = {
  inner: ["React", "Next.js", "TypeScript", "Tailwind"],
  middle: ["Three.js", "WebGL", "GLSL", "R3F"],
  outer: ["Node.js", "Python", "PostgreSQL", "Docker"],
};

interface GyroscopeProps {
  containerRef?: React.RefObject<HTMLElement>;
}

// Single ring with orbital text
function GyroRing({
  radius,
  tube,
  skills,
  rotationAxis,
  baseSpeed,
  ringColor,
  seamColor,
}: {
  radius: number;
  tube: number;
  skills: string[];
  rotationAxis: "x" | "y" | "z";
  baseSpeed: number;
  ringColor: THREE.Color;
  seamColor: THREE.Color;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const currentRotation = useRef(0);

  // Custom shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uRimColor: { value: ringColor },
        uRimPower: { value: 3.0 },
        uSeamColor: { value: seamColor },
        uSeamIntensity: { value: 1.0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uRimColor;
        uniform float uRimPower;
        uniform vec3 uSeamColor;
        uniform float uSeamIntensity;
        uniform float uTime;

        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        void main() {
          vec3 baseColor = vec3(0.15, 0.16, 0.18);
          vec3 viewDirection = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), uRimPower);
          vec3 rimLight = uRimColor * fresnel * 0.5;

          float seamBand = abs(vUv.y - 0.5);
          float seamWidth = 0.1;
          float seam = smoothstep(seamWidth, seamWidth * 0.5, seamBand);
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          vec3 seamGlow = uSeamColor * seam * uSeamIntensity * (0.7 + pulse * 0.3);

          vec3 finalColor = baseColor + rimLight + seamGlow;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [ringColor, seamColor]);

  useFrame((state, delta) => {
    if (!ringRef.current || !groupRef.current) return;

    // Update time uniform
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }

    // Rotate group (ring + text together)
    currentRotation.current += baseSpeed * delta;
    groupRef.current.rotation[rotationAxis] = currentRotation.current;
  });

  // Calculate positions for skills along the ring
  const skillPositions = useMemo(() => {
    return skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      return { angle };
    });
  }, [skills]);

  return (
    <group ref={groupRef}>
      {/* The ring */}
      <mesh ref={ringRef} material={material}>
        <torusGeometry args={[radius, tube, 32, 100]} />
      </mesh>

      {/* Orbital text for each skill */}
      {skills.map((skill, index) => {
        const { angle } = skillPositions[index];

        // Calculate position on ring based on rotation axis
        let x = 0,
          y = 0,
          z = 0;

        if (rotationAxis === "x") {
          y = radius * Math.cos(angle);
          z = radius * Math.sin(angle);
        } else if (rotationAxis === "y") {
          x = radius * Math.cos(angle);
          z = radius * Math.sin(angle);
        } else {
          x = radius * Math.cos(angle);
          y = radius * Math.sin(angle);
        }

        return (
          <BillboardText
            key={skill}
            text={skill}
            position={[x, y, z]}
            color={seamColor}
          />
        );
      })}
    </group>
  );
}

// Billboard text component
function BillboardText({
  text,
  position,
  color,
}: {
  text: string;
  position: [number, number, number];
  color: THREE.Color;
}) {
  const textRef = useRef<THREE.Mesh>(null!);

  useFrame(({ camera }) => {
    if (!textRef.current) return;

    // Billboard: always face camera
    textRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={0.35}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        outlineOpacity={1}
      >
        {text}
      </Text>

      {/* Point light for glow effect */}
      <pointLight position={[0, 0, 0]} intensity={1} distance={3} color={color} />
    </group>
  );
}

export function Gyroscope({ containerRef }: GyroscopeProps) {
  const systemRef = useRef<THREE.Group>(null!);

  // GSAP ScrollTrigger for "vault lock" effect
  useLayoutEffect(() => {
    if (!containerRef?.current || !systemRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      // Start from locked/aligned state, then expand
      tl.fromTo(
        systemRef.current.scale,
        { x: 0.3, y: 0.3, z: 0.3 },
        { x: 1, y: 1, z: 1, ease: "power2.out" }
      );

      // Add rotation for dramatic entrance
      tl.fromTo(
        systemRef.current.rotation,
        { y: -Math.PI },
        { y: 0, ease: "power2.out" },
        "<"
      );
    });

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#66aaff" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#ff66aa" />

      {/* Main gyroscope system */}
      <group ref={systemRef}>
        {/* Inner ring - rotates on X axis */}
        <GyroRing
          radius={2}
          tube={0.08}
          skills={SKILLS.inner}
          rotationAxis="x"
          baseSpeed={0.5}
          ringColor={new THREE.Color(0.4, 0.7, 1.0)}
          seamColor={new THREE.Color(0.3, 0.8, 1.0)}
        />

        {/* Middle ring - rotates on Y axis */}
        <GyroRing
          radius={3.5}
          tube={0.1}
          skills={SKILLS.middle}
          rotationAxis="y"
          baseSpeed={0.3}
          ringColor={new THREE.Color(0.6, 0.4, 1.0)}
          seamColor={new THREE.Color(0.8, 0.3, 1.0)}
        />

        {/* Outer ring - rotates on Z axis */}
        <GyroRing
          radius={5}
          tube={0.12}
          skills={SKILLS.outer}
          rotationAxis="z"
          baseSpeed={0.2}
          ringColor={new THREE.Color(0.4, 1.0, 0.7)}
          seamColor={new THREE.Color(0.3, 1.0, 0.8)}
        />

        {/* Central core */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#66aaff"
            emissive="#66aaff"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Post-processing: Heavy bloom on text and ring edges */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </>
  );
}
