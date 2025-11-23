uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

// Fractal Brownian Motion for organic noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for(int i = 0; i < 6; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

// Create nebulous, smoke-like patterns
vec3 createNebula(vec2 uv, float time) {
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  // Mouse influence - create distortion field
  vec2 mousePos = uMouse * 2.0 - 1.0;
  float mouseDist = length(p - mousePos);
  vec2 mouseInfluence = (p - mousePos) / (mouseDist + 0.5) * 0.1;

  // Multi-layered fractal noise for depth
  float n1 = fbm(p * 1.5 + time * 0.02 + mouseInfluence);
  float n2 = fbm(p * 2.0 - time * 0.015 + vec2(5.2, 1.3));
  float n3 = fbm(p * 3.0 + time * 0.01 + vec2(9.2, 3.7));

  // Combine layers
  float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  // Deep space color palette
  vec3 obsidian = vec3(0.02, 0.02, 0.05);
  vec3 deepViolet = vec3(0.05, 0.02, 0.12);
  vec3 faintTeal = vec3(0.02, 0.08, 0.12);
  vec3 voidBlack = vec3(0.01, 0.01, 0.02);

  // Color mixing based on noise
  vec3 color = mix(voidBlack, obsidian, smoothstep(0.2, 0.4, noise));
  color = mix(color, deepViolet, smoothstep(0.4, 0.6, noise));
  color = mix(color, faintTeal, smoothstep(0.6, 0.8, noise));

  // Add some bright spots (distant stars/energy)
  float brightSpots = fbm(p * 8.0 + time * 0.03);
  brightSpots = pow(brightSpots, 4.0) * 0.3;
  color += vec3(brightSpots);

  // Vignette effect
  float vignette = 1.0 - length(uv - 0.5) * 0.8;
  color *= vignette;

  return color;
}

void main() {
  vec3 nebula = createNebula(vUv, uTime);

  // Add subtle scanlines for sci-fi feel
  float scanline = sin(vUv.y * uResolution.y * 0.5 + uTime * 2.0) * 0.02;
  nebula += vec3(scanline);

  gl_FragColor = vec4(nebula, 1.0);
}
