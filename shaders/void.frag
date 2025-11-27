uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = vUv;

  // Create star field
  float stars = 0.0;
  for (int i = 0; i < 3; i++) {
    float scale = pow(2.0, float(i));
    vec2 starUv = st * scale * 100.0;
    float n = random(floor(starUv));

    if (n > 0.99) {
      vec2 starPos = fract(starUv);
      float dist = length(starPos - 0.5);
      float brightness = smoothstep(0.5, 0.0, dist);
      stars += brightness * 0.3;
    }
  }

  // Add mouse-reactive nebula effect
  vec2 mouseInfluence = (uMouse - st) * 2.0;
  float nebula = noise(st * 3.0 + uTime * 0.1 + mouseInfluence * 0.5);
  nebula = smoothstep(0.3, 0.7, nebula);

  // Combine effects
  vec3 color = vec3(0.05, 0.05, 0.1);
  color += vec3(0.4, 0.7, 1.0) * stars; // Light blue stars instead of white
  color += vec3(0.1, 0.15, 0.3) * nebula * 0.3;

  // Add subtle gradient
  color += vec3(0.0, 0.02, 0.05) * (1.0 - st.y);

  gl_FragColor = vec4(color, 1.0);
}
