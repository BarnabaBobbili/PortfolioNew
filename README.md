# Sci-Fi Portfolio

A cutting-edge portfolio website featuring immersive 3D graphics, physics-based interactions, and cinematic effects.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, @react-three/drei, Three.js
- **Animation**: GSAP (ScrollTrigger), Framer Motion
- **Smooth Scrolling**: Lenis
- **Shaders**: Custom GLSL shaders with glslify
- **Post-Processing**: Bloom, Chromatic Aberration

## Features

- **Liquid Hero**: Morphing 3D object with Perlin noise distortion and refraction
- **StarField Background**: Interactive particle background with mouse tracking
- **Custom Cursor**: Blended cursor with spring physics
- **Magnetic Navigation**: Physics-based button interactions
- **Portal Effect**: Hoverable project previews with trailing cursor
- **Infinite Marquee**: Scroll-reactive text animation
- **Kinetic Typography**: Character-by-character text reveal animations
- **Post-Processing**: Cinematic bloom and chromatic aberration effects

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with fonts and Lenis
│   └── page.tsx           # Main page
├── components/
│   ├── canvas/            # R3F 3D components
│   │   ├── SceneCanvas.tsx
│   │   ├── StarField.tsx
│   │   └── LiquidHero.tsx
│   ├── effects/           # Effect components
│   │   └── SmoothScroll.tsx
│   ├── ui/                # UI components
│   │   ├── CustomCursor.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── PortalCursor.tsx
│   │   ├── InfiniteMarquee.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   └── Contact.tsx
│   └── navigation/        # Navigation components
├── shaders/               # GLSL shader files
│   ├── starfield.vert
│   ├── starfield.frag
│   ├── liquid.vert
│   └── liquid.frag
└── public/               # Static assets
    └── grain.png         # Grain texture (add manually)
```

## Customization

### Adding Projects

Edit the `projects` array in `components/ui/Work.tsx`:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    year: "2024",
    tags: ["Tag1", "Tag2"],
    preview: "image-url-or-video-url",
  },
  // ...
];
```

### Adjusting 3D Effects

Modify shader uniforms in:
- `components/canvas/LiquidHero.tsx` - Liquid morphing effect
- `components/canvas/StarField.tsx` - Background particles

### Changing Colors

Update the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  void: "#0a0a0f",
  "void-light": "#121218",
}
```

## Performance Tips

- The 3D canvas uses WebGL and may be GPU-intensive
- Post-processing effects can impact performance on lower-end devices
- Consider adding a reduced-motion preference check
- Optimize images and use WebP format

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL 2.0 support.

## License

All rights reserved.
