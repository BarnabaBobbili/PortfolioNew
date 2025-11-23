# Hero Section - "Ethereal Void"

The hero section is designed to feel like an interface discovered on an alien vessel, with seamless integration between WebGL and DOM typography.

## Architecture

### Layer Z-0: The Void Environment (R3F Canvas)
**Component**: `VoidBackground.tsx`

A full-screen shader-based background with:
- Custom fractal noise (FBM) generating smoke-like patterns
- Deep space color palette (obsidian, deep violet, faint teal)
- Mouse-reactive distortion field
- Multi-layered noise for depth
- Subtle vignette and scanlines for sci-fi aesthetic

**Shader Files**: `shaders/void.vert`, `shaders/void.frag`

### Layer Z-1: Reactive Particulates
**Component**: `ReactiveParticles.tsx`

2000+ particle system featuring:
- Space dust/"data motes" aesthetic
- Mouse repulsion physics (particles flee from cursor)
- Boundary wrapping for infinite effect
- Additive blending for ethereal glow
- Gentle drift animation

### Layer Z-2: Liquid Artifact Centerpiece
**Component**: `LiquidArtifact.tsx`

The focal 3D object with:
- **Material**: `MeshTransmissionMaterial` from drei
  - Refraction and chromatic aberration
  - Glass/liquid chrome appearance
  - Light transmission through object
- **Geometry**: Heavily subdivided icosahedron (128 subdivisions)
- **Animation**:
  - Mouse-following rotation (smooth lerp)
  - Automatic slow rotation
  - Floating sine wave motion
- **Extras**: Inner glow sphere + outer energy ring

### Layer Z-10: Cinematic Typography (DOM)
**Component**: `HeroSection.tsx`

Features:
- **Decode Effect**: Text starts scrambled and "decodes" into final form
- **GSAP ScrollTrigger**:
  - 3D perspective push-back effect on scroll
  - Progressive blur as user scrolls
  - Rotation in 3D space
- **Styling**: Gradient text, sci-fi brackets, system-style labels
- **CTA Buttons**: Magnetic hover effects with animated overlays

**Subcomponent**: `DecodeText.tsx`
- Character-by-character decoding
- Alternates between glitch chars (!<>-_\\/[]{}—=+*^?#) and binary (01)
- Progressive reveal with blur-to-sharp transition

## Post-Processing Stack
**Component**: `HeroCanvas.tsx`

Applied effects:
1. **Bloom** - Glowing bright elements (intensity: 0.8)
2. **Chromatic Aberration** - RGB split on edges (radial modulation)
3. **Noise** - Film grain overlay (15% opacity)
4. **Vignette** - Edge darkening (30% offset)

## Scroll Interactions

### Text Behavior
- Starts: Full opacity, sharp, centered
- On Scroll:
  - Moves back 500px in Z-space
  - Rotates -15° on X-axis
  - Blurs to 20px
  - Opacity → 0
  - Scale → 0.8

### Canvas Behavior
- On Scroll:
  - Opacity → 0.3
  - Scale → 1.2
  - Blur → 5px

## File Structure

```
components/hero/
├── HeroCanvas.tsx          # R3F Canvas wrapper + post-processing
├── HeroSection.tsx         # DOM typography + GSAP animations
├── VoidBackground.tsx      # Shader background
├── ReactiveParticles.tsx   # Particle system
├── LiquidArtifact.tsx      # Central 3D object
├── DecodeText.tsx          # Text decode effect
├── index.ts               # Barrel exports
└── README.md              # This file

shaders/
├── void.vert              # Void background vertex shader
├── void.frag              # Void background fragment shader
├── liquid.vert            # Liquid artifact vertex shader (morphing)
└── liquid.frag            # Liquid artifact fragment shader
```

## Customization

### Adjust Particle Count
```tsx
// ReactiveParticles.tsx
const particleCount = 2000; // Reduce for better performance
```

### Change Color Palette
```glsl
// shaders/void.frag
vec3 obsidian = vec3(0.02, 0.02, 0.05);      // Base dark
vec3 deepViolet = vec3(0.05, 0.02, 0.12);    // Mid tones
vec3 faintTeal = vec3(0.02, 0.08, 0.12);     // Highlights
```

### Modify Decode Speed
```tsx
// HeroSection.tsx
<DecodeText
  text="YOUR TEXT"
  delay={500}      // ms before starting
  speed={40}       // ms per frame
/>
```

### Adjust Transmission Material
```tsx
// LiquidArtifact.tsx
<MeshTransmissionMaterial
  transmission={1}           // 0-1, glass transparency
  roughness={0.2}           // Surface roughness
  thickness={1.5}           // Glass thickness
  ior={1.5}                 // Index of refraction
  chromaticAberration={0.5} // RGB split strength
/>
```

## Performance Notes

- Particle system is GPU-accelerated
- Shader complexity: Medium (FBM with 6 octaves)
- Post-processing adds ~5-10ms per frame
- Target: 60fps on mid-range GPUs
- Consider reducing particle count on mobile

## Browser Requirements

- WebGL 2.0
- ES6+ JavaScript
- Supports: Chrome 90+, Firefox 88+, Safari 14+
