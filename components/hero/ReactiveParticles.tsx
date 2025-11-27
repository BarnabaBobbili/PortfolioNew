"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ReactiveParticles Component
 *
 * Creates a field of interactive particles that simulate flying through space.
 * Particles can move towards or away from the camera like a spaceship traveling through a star field.
 *
 * FEATURES:
 * - 150 particles scattered across the scene
 * - Mouse repulsion effect (particles flee from cursor)
 * - Bidirectional Z-axis movement (towards or away from camera)
 * - Particles respawn automatically to maintain continuous flow
 * - Creates "warp speed" / hyperspace flying effect
 * - Direction can be controlled via props
 * - Additive blending for glowing effect
 *
 * @param direction - 'towards' (default): particles fly towards camera | 'away': particles fly away from camera
 *
 * RENDERING: Uses THREE.Points for efficient particle rendering
 * COLOR: Light blue (#66aaff) with transparency and glow
 */

// Configuration constants
const PARTICLE_COUNT = 300; // Total number of particles
const REPULSION_STRENGTH = 2.5; // How strongly particles flee from cursor
const LERP_FACTOR = 0.08; // Mouse smoothing (lower = smoother)
const FORWARD_SPEED = 3; // Speed particles move towards camera
const Z_START = -10; // Back position where particles spawn
const Z_END = 5; // Front position where particles respawn

interface ReactiveParticlesProps {
  direction?: 'towards' | 'away'; // Direction particles move
}

export function ReactiveParticles({ direction = 'towards' }: ReactiveParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { pointer, viewport, clock } = useThree();

  // Smoothed mouse position for fluid movement
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  // Create circular texture for particles
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    // Draw a circular gradient
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Animation loop - runs every frame
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;

    // === MOUSE POSITION SMOOTHING ===
    // Convert pointer from normalized (-1 to 1) to world space coordinates
    const targetMouseX = (pointer.x * viewport.width) / 2;
    const targetMouseY = (pointer.y * viewport.height) / 2;

    // Smooth mouse movement using linear interpolation (lerp)
    smoothMouseRef.current.x += (targetMouseX - smoothMouseRef.current.x) * LERP_FACTOR;
    smoothMouseRef.current.y += (targetMouseY - smoothMouseRef.current.y) * LERP_FACTOR;

    const mouseX = smoothMouseRef.current.x;
    const mouseY = smoothMouseRef.current.y;

    // === UPDATE EACH PARTICLE ===
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3; // Index in position array (x, y, z for each particle)

      // Get current position
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // === MOVE BASED ON DIRECTION ===
      if (direction === 'towards') {
        // Move towards camera (forward on Z-axis)
        z += FORWARD_SPEED * delta;

        // Respawn at back when particle passes camera
        if (z > Z_END) {
          x = (Math.random() - 0.5) * 12;
          y = (Math.random() - 0.5) * 10;
          z = Z_START;
        }
      } else {
        // Move away from camera (backward on Z-axis)
        z -= FORWARD_SPEED * delta;

        // Respawn at front when particle goes too far back
        if (z < Z_START) {
          x = (Math.random() - 0.5) * 12;
          y = (Math.random() - 0.5) * 10;
          z = Z_END;
        }
      }

      // === MOUSE REPULSION ===
      // Calculate distance from mouse to current particle position (in 2D screen space)
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Particles closer to mouse are pushed away
      if (dist < 3 && dist > 0.01) {
        const repulsionFactor = (REPULSION_STRENGTH / (dist + 0.3)) * delta;
        x += (dx / dist) * repulsionFactor;
        y += (dy / dist) * repulsionFactor;
      }

      // Update position
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }

    // Tell Three.js that positions have changed and need re-render
    positionAttr.needsUpdate = true;
  });

  // === GENERATE INITIAL RANDOM POSITIONS ===
  // Distribute particles throughout the depth field for continuous forward movement
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    // Random X/Y positions spread across the view
    positions[i3] = (Math.random() - 0.5) * 12; // X: -6 to 6
    positions[i3 + 1] = (Math.random() - 0.5) * 10; // Y: -5 to 5
    // Random Z positions from back to front (creates initial field)
    positions[i3 + 2] = Z_START + Math.random() * (Z_END - Z_START); // Z: spread throughout depth
  }

  return (
    <points ref={pointsRef}>
      {/* Geometry holds particle positions */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>

      {/* Material defines how particles look */}
      <pointsMaterial
        size={0.1} // Particle size
        color="#66aaff" // Light blue
        transparent
        opacity={0.8}
        sizeAttenuation // Particles get smaller with distance
        blending={THREE.AdditiveBlending} // Additive blending for glow effect
        map={circleTexture} // Apply circular texture to make particles round
        alphaTest={0.01} // Discard pixels with low alpha for clean edges
      />
    </points>
  );
}
