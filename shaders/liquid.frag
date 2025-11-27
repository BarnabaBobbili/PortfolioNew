uniform float uTime;
uniform vec3 uColor;
uniform float uRefractionStrength;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Calculate Fresnel effect
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

  // Refraction effect
  vec2 refractedUv = vUv + vNormal.xy * uRefractionStrength;

  // Iridescent color shift
  vec3 color = uColor;
  color += vec3(0.2, 0.4, 0.6) * fresnel;

  // Add light blue highlights instead of white
  float specular = pow(max(dot(vNormal, viewDirection), 0.0), 32.0);
  color += vec3(0.4, 0.7, 1.0) * specular * 0.8; // Light blue highlights

  // Glass-like transparency
  float alpha = mix(0.3, 0.9, fresnel);

  gl_FragColor = vec4(color, alpha);
}
