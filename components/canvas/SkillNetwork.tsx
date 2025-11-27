"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface SkillNode {
  id: string;
  label: string;
  position: THREE.Vector3;
  connections: string[];
  color: string;
  category: string;
}

export function SkillNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Define skill nodes with 3D positions and connections
  const skillNodes: SkillNode[] = useMemo(() => {
    return [
      // Frontend cluster
      { id: "react", label: "React", position: new THREE.Vector3(-3, 2, 0), connections: ["next", "three", "typescript"], color: "#61DAFB", category: "frontend" },
      { id: "next", label: "Next.js", position: new THREE.Vector3(-4, 0, 1), connections: ["react", "typescript", "node"], color: "#000000", category: "frontend" },
      { id: "typescript", label: "TypeScript", position: new THREE.Vector3(-2, -1, 0), connections: ["react", "next", "node"], color: "#3178C6", category: "frontend" },

      // 3D/Graphics cluster
      { id: "three", label: "Three.js", position: new THREE.Vector3(0, 3, -1), connections: ["react", "webgl", "glsl"], color: "#049EF4", category: "3d" },
      { id: "webgl", label: "WebGL", position: new THREE.Vector3(1, 2, -2), connections: ["three", "glsl"], color: "#990000", category: "3d" },
      { id: "glsl", label: "GLSL", position: new THREE.Vector3(2, 1, -1), connections: ["three", "webgl"], color: "#5586A4", category: "3d" },

      // Backend cluster
      { id: "node", label: "Node.js", position: new THREE.Vector3(-2, -3, 1), connections: ["typescript", "next", "python"], color: "#339933", category: "backend" },
      { id: "python", label: "Python", position: new THREE.Vector3(0, -4, 0), connections: ["node", "ml"], color: "#3776AB", category: "backend" },

      // Tools/Other
      { id: "ml", label: "ML/AI", position: new THREE.Vector3(2, -2, 1), connections: ["python"], color: "#FF6F00", category: "ai" },
      { id: "design", label: "UI/UX", position: new THREE.Vector3(3, 0, 2), connections: ["react"], color: "#FF61F6", category: "design" },
    ];
  }, []);

  // Create connection lines
  const connections = useMemo(() => {
    const lines: Array<{ from: THREE.Vector3; to: THREE.Vector3 }> = [];

    skillNodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const targetNode = skillNodes.find((n) => n.id === connId);
        if (targetNode) {
          lines.push({
            from: node.position.clone(),
            to: targetNode.position.clone(),
          });
        }
      });
    });

    return lines;
  }, [skillNodes]);

  // Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Slow auto-rotation
      groupRef.current.rotation.y += 0.001;

      // Mouse-based rotation
      const targetX = pointer.y * 0.3;
      const targetY = pointer.x * 0.3;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, index) => (
        <Line
          key={index}
          start={conn.from}
          end={conn.to}
          color="#4A90E2"
          opacity={hoveredNode ? 0.2 : 0.3}
        />
      ))}

      {/* Skill nodes */}
      {skillNodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isConnected = hoveredNode && skillNodes.find(n => n.id === hoveredNode)?.connections.includes(node.id);
        const shouldHighlight = isHovered || isConnected;

        return (
          <group key={node.id} position={node.position}>
            {/* Node sphere */}
            <mesh
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode(null)}
            >
              <sphereGeometry args={[shouldHighlight ? 0.25 : 0.2, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={shouldHighlight ? 0.8 : 0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Glow ring */}
            {shouldHighlight && (
              <mesh>
                <ringGeometry args={[0.3, 0.35, 32]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.5} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* Label */}
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.2}
              color={shouldHighlight ? "#ffffff" : "#aaaaaa"}
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono.ttf"
            >
              {node.label}
            </Text>

            {/* Particles around hovered node */}
            {isHovered && <NodeParticles color={node.color} />}
          </group>
        );
      })}

      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

// Line component for connections
function Line({ start, end, color, opacity }: { start: THREE.Vector3; end: THREE.Vector3; color: string; opacity: number }) {
  const ref = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points = [start, end];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

// Particles around hovered node
function NodeParticles({ color }: { color: string }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 0.4 + Math.random() * 0.3;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
