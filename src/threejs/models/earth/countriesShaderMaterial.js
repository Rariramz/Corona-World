import * as THREE from "three";

import earthImg from "../../../images/earth-textures/earth-night.jpg";
import earthCountriesShadesImg from "../../../images/earth-textures/earth-index-shifted-gray.png";
import earthCountriesOutlinesImg from "../../../images/earth-textures/earth-outline-shifted-gray.png";

// ------------------------------------------------------------------------------------------------
// Create the "lookup texture", which contains a colored pixel for each country
//  -- the pixel at (x,1) is the color of the country labelled with gray RGB_Color(x,x,x,1).
const lookupCanvas = document.createElement("canvas");
lookupCanvas.width = 256;
lookupCanvas.height = 1;
export const lookupContext = lookupCanvas.getContext("2d");
export const lookupTexture = new THREE.Texture(lookupCanvas);
lookupTexture.magFilter = THREE.NearestFilter;
lookupTexture.minFilter = THREE.NearestFilter;
lookupTexture.needsUpdate = true;

const mapTexture = new THREE.TextureLoader().load(earthCountriesShadesImg);
mapTexture.magFilter = THREE.NearestFilter;
mapTexture.minFilter = THREE.NearestFilter;
mapTexture.needsUpdate = true;

const outlineTexture = new THREE.TextureLoader().load(
  earthCountriesOutlinesImg
);
outlineTexture.needsUpdate = true;

const blendImage = new THREE.TextureLoader().load(earthImg);

export const countriesShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    width: { type: "f", value: window.innerWidth },
    height: { type: "f", value: window.innerHeight },
    mapIndex: { type: "t", value: mapTexture },
    outline: { type: "t", value: outlineTexture },
    lookup: { type: "t", value: lookupTexture },
    blendImage: { type: "t", value: blendImage },
  },
  vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
        vNormal = normalize( normalMatrix * normal );
        vUv = uv;
      }`,
  fragmentShader: `
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
        if (outlineColor.x > 0.1) outlineColor = vec4(0.64, 0.9, 1.0, 1.0);
    
        
        gl_FragColor = 0.2 * outlineColor + 0.5 * lookupColor + 1.0 * blendColor;
      }`,
});

const mapCanvas = document.createElement("canvas");
mapCanvas.width = 4096;
mapCanvas.height = 2048;
export const mapContext = mapCanvas.getContext("2d");
const imageObj = new Image();
imageObj.onload = function () {
  mapContext.drawImage(imageObj, 0, 0);
};
imageObj.src = earthCountriesShadesImg;
