uniform float uTime;
uniform vec2 uResolution;
uniform float uIntensity;

varying vec2 vUv;

// Random noise function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Create noise pattern
  vec2 st = vUv * uResolution;
  float noise = random(st + uTime);

  // Add scanline pattern
  float scanline = sin(vUv.y * uResolution.y * 2.0) * 0.5 + 0.5;

  // Combine noise and scanline
  float combined = mix(noise, scanline, 0.3);

  // Apply intensity
  vec3 color = vec3(combined * uIntensity);

  // Add slight blue tint
  color *= vec3(0.8, 0.9, 1.0);

  gl_FragColor = vec4(color, combined * 0.3);
}
