uniform vec3 uRimColor;
uniform float uRimPower;
uniform vec3 uSeamColor;
uniform float uSeamIntensity;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
  // Base titanium/brushed metal color
  vec3 baseColor = vec3(0.15, 0.16, 0.18);

  // Fresnel rim lighting
  vec3 viewDirection = normalize(vViewPosition);
  float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), uRimPower);
  vec3 rimLight = uRimColor * fresnel;

  // Energy seam running through the middle of the torus
  // Use V coordinate to create a band around the circumference
  float seamBand = abs(vUv.y - 0.5); // Center of V coordinate
  float seamWidth = 0.1;
  float seam = smoothstep(seamWidth, seamWidth * 0.5, seamBand);

  // Pulsating energy effect
  float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
  vec3 seamGlow = uSeamColor * seam * uSeamIntensity * (0.7 + pulse * 0.3);

  // Combine all effects
  vec3 finalColor = baseColor + rimLight + seamGlow;

  gl_FragColor = vec4(finalColor, 1.0);
}
