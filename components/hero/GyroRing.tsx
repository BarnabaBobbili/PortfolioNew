"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * GyroRing Component
 *
 * A single ring in the gyroscope system with custom shader material.
 * Features brushed titanium appearance with glowing energy seam and Fresnel rim lighting.
 *
 * FEATURES:
 * - TorusGeometry for the ring shape
 * - Custom GLSL shader with Fresnel rim effect
 * - Glowing energy seam running through the middle
 * - Pulsating energy effect
 * - Continuous rotation on specified axis
 *
 * @param radius - Ring radius
 * @param tube - Tube thickness
 * @param rotationAxis - Axis to rotate on ('x', 'y', or 'z')
 * @param rotationSpeed - Base rotation speed
 * @param rimColor - Color of the rim light (Fresnel effect)
 * @param seamColor - Color of the energy seam
 */

interface GyroRingProps {
  radius: number;
  tube?: number;
  rotationAxis: "x" | "y" | "z";
  rotationSpeed: number;
  rimColor?: THREE.Color;
  seamColor?: THREE.Color;
}

export function GyroRing({
  radius,
  tube = 0.1,
  rotationAxis,
  rotationSpeed,
  rimColor = new THREE.Color(0.4, 0.7, 1.0), // Cyan
  seamColor = new THREE.Color(0.2, 0.8, 1.0), // Bright cyan
}: GyroRingProps) {
  const ringRef = useRef<THREE.Mesh>(null!);

  // Custom shader material with energy seam and Fresnel rim
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uRimColor: { value: rimColor },
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
          // Base titanium/brushed metal color
          vec3 baseColor = vec3(0.15, 0.16, 0.18);

          // Fresnel rim lighting
          vec3 viewDirection = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), uRimPower);
          vec3 rimLight = uRimColor * fresnel;

          // Energy seam running through the middle of the torus
          // Use V coordinate to create a band around the circumference
          float seamBand = abs(vUv.y - 0.5); // Center of V coordinate
          float seamWidth = 0.1;
          float seam = smoothstep(seamWidth, seamWidth * 0.5, seamBand);

          // Pulsating energy effect
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          vec3 seamGlow = uSeamColor * seam * uSeamIntensity * (0.7 + pulse * 0.3);

          // Combine all effects
          vec3 finalColor = baseColor + rimLight + seamGlow;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [rimColor, seamColor]);

  // Animation loop
  useFrame((state) => {
    if (!ringRef.current) return;

    // Update time uniform for pulsating effect
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }

    // Rotate on specified axis
    ringRef.current.rotation[rotationAxis] += rotationSpeed;
  });

  return (
    <mesh ref={ringRef} material={material}>
      <torusGeometry args={[radius, tube, 32, 100]} />
    </mesh>
  );
}
