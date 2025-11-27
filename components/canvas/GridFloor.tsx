"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

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
        args={[50, 50, 0x4A90E2, 0x1a3a5a]}
        rotation={[0, 0, 0]}
      />

      {/* Secondary grid for depth */}
      <gridHelper
        args={[50, 50, 0x2a5f8f, 0x0a1a2f]}
        position={[0, -0.1, 10]}
        rotation={[0, 0, 0]}
      />

      {/* Fog for depth effect */}
      <fog attach="fog" args={["#0a0a0f", 10, 40]} />
    </group>
  );
}
