"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * OrbitalText Component
 *
 * Text that travels along a circular orbital path around the gyroscope center.
 * Uses billboarding to always face the camera for readability.
 *
 * MATHEMATICS:
 * - Position calculated using parametric circle equation:
 *   x = radius * cos(angle)
 *   y = radius * sin(angle)
 * - Quaternion-based billboarding ensures text faces camera while moving
 *
 * FEATURES:
 * - Distributes text along circular path
 * - Billboard effect (always faces camera)
 * - Glowing holographic appearance
 * - Rotates with parent ring
 *
 * @param text - Skill name to display
 * @param radius - Orbital radius (matches parent ring)
 * @param angle - Starting angle in radians
 * @param rotationAxis - Axis the ring rotates on
 * @param parentRotation - Parent ring's current rotation (for syncing)
 */

interface OrbitalTextProps {
  text: string;
  radius: number;
  angle: number;
  rotationAxis: "x" | "y" | "z";
  parentRotation: React.MutableRefObject<number>;
}

export function OrbitalText({
  text,
  radius,
  angle,
  rotationAxis,
  parentRotation,
}: OrbitalTextProps) {
  const textRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ camera }) => {
    if (!textRef.current || !groupRef.current) return;

    // Calculate position along circular path
    // The text moves along the ring's circumference
    let x = 0,
      y = 0,
      z = 0;

    // Get current rotation from parent
    const currentRotation = parentRotation.current;

    // Position depends on which axis the ring rotates on
    if (rotationAxis === "x") {
      // Ring rotates on X-axis: text moves in YZ plane
      y = radius * Math.cos(angle);
      z = radius * Math.sin(angle);
      // Apply parent rotation
      groupRef.current.rotation.x = currentRotation;
    } else if (rotationAxis === "y") {
      // Ring rotates on Y-axis: text moves in XZ plane
      x = radius * Math.cos(angle);
      z = radius * Math.sin(angle);
      // Apply parent rotation
      groupRef.current.rotation.y = currentRotation;
    } else {
      // Ring rotates on Z-axis: text moves in XY plane
      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);
      // Apply parent rotation
      groupRef.current.rotation.z = currentRotation;
    }

    groupRef.current.position.set(x, y, z);

    // Billboard effect: make text face the camera
    // Get camera position and text position
    const cameraPosition = camera.position.clone();
    const textPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(textPosition);

    // Calculate direction from text to camera
    const direction = cameraPosition.sub(textPosition).normalize();

    // Create lookAt matrix
    const matrix = new THREE.Matrix4();
    matrix.lookAt(direction, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));

    // Extract rotation and apply to text
    const quaternion = new THREE.Quaternion();
    quaternion.setFromRotationMatrix(matrix);
    textRef.current.quaternion.copy(quaternion);
  });

  return (
    <group ref={groupRef}>
      <Text
        ref={textRef}
        fontSize={0.3}
        color="#66aaff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        outlineOpacity={0.8}
      >
        {text}
      </Text>

      {/* Subtle glow behind text */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        distance={2}
        color="#66aaff"
      />
    </group>
  );
}
