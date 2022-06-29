export const fragmentShader = `
  uniform sampler2D mapIndex;
  uniform sampler2D lookup;
  uniform sampler2D outline;
  uniform sampler2D blendImage;
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vec4 mapColor = texture2D( mapIndex, vUv );    
    float indexedColor = mapColor.y;       
    vec2 lookupUV = vec2( indexedColor, 0.0 );
    vec4 lookupColor = texture2D( lookup, lookupUV );                              
    vec4 outlineColor = texture2D( outline, vUv );
    vec4 blendColor = texture2D( blendImage, vUv );
    // if (outlineColor.x > 0.1) outlineColor = vec4(1.0,1.0,1.0,1.0);

    
    gl_FragColor = 0.5 * outlineColor + 1.0 * lookupColor + 0.5 * blendColor;
  }`