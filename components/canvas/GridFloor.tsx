"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const [themeColors, setThemeColors] = useState({ primary: 0x4A90E2, secondary: 0x2a5f8f, dark: 0x1a3a5a });

  useEffect(() => {
    const updateThemeColors = () => {
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || '#4A90E2';
      const secondary = getComputedStyle(document.documentElement).getPropertyValue('--theme-secondary').trim() || '#2a5f8f';
      const dark = getComputedStyle(document.documentElement).getPropertyValue('--theme-dark').trim() || '#1a3a5a';

      setThemeColors({
        primary: parseInt(primary.replace('#', '0x')),
        secondary: parseInt(secondary.replace('#', '0x')),
        dark: parseInt(dark.replace('#', '0x'))
      });
    };

    updateThemeColors();

    // Listen for theme changes
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      // Animate grid moving towards camera
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 10;
    }
  });

  return (
    <group position={[0, -3, 0]}>
      {/* Primary grid */}
      <gridHelper
        ref={gridRef}
        args={[50, 50, themeColors.primary, themeColors.dark]}
        rotation={[0, 0, 0]}
      />

      {/* Secondary grid for depth */}
      <gridHelper
        args={[50, 50, themeColors.secondary, 0x0a1a2f]}
        position={[0, -0.1, 10]}
        rotation={[0, 0, 0]}
      />

      {/* Fog for depth effect */}
      <fog attach="fog" args={["#0a0a0f", 10, 40]} />
    </group>
  );
}
