import * as THREE from "three";

import countryByCode from "../../geojson/countryByCode";
import countryByContinent from "../../geojson/countryByContinent";
import { countryColorMap } from "./countryColorMap";

import earthImg from "../../images/earth-blue-marble.jpg";
import earthCountriesShadesImg from "../../images/earth-index-shifted-gray.png";
import earthCountriesOutlinesImg from "../../images/earth-outline-shifted-gray.png";

// ------------------------------------------------------------------------------------------------
// Create the "lookup texture", which contains a colored pixel for each country
//  -- the pixel at (x,1) is the color of the country labelled with gray RGB_Color(x,x,x,1).
const lookupCanvas = document.createElement("canvas");
lookupCanvas.width = 256;
lookupCanvas.height = 1;
const lookupContext = lookupCanvas.getContext("2d");
const lookupTexture = new THREE.Texture(lookupCanvas);
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
        // if (outlineColor.x > 0.1) outlineColor = vec4(1.0,1.0,1.0,1.0);
    
        
        gl_FragColor = 0.99 * outlineColor + 1.0 * lookupColor + 0.99 * blendColor;
      }`,
});

const mapCanvas = document.createElement("canvas");
mapCanvas.width = 4096;
mapCanvas.height = 2048;
const mapContext = mapCanvas.getContext("2d");
const imageObj = new Image();
imageObj.onload = function () {
  mapContext.drawImage(imageObj, 0, 0);
};
imageObj.src = earthCountriesShadesImg;

// EVENTS
const earthClickEvent = (canvas) => (event) => {
  event.preventDefault();

  const { getIntersects, getModel } = canvas.getEventControllers();

  const earth = getModel("earth");
  if (earth === undefined) return;

  try {
    let selectedCountryId = -1;

    const intersects = getIntersects({
      mouseCoordinates: { x: event.clientX, y: event.clientY },
      object: earth,
    });

    if (intersects.length > 0) {
      const data = intersects[0];
      const d = data.point.clone().normalize();
      const u = Math.round(
        4096 * (1 - (0.5 + Math.atan2(d.z, d.x) / (2 * Math.PI)))
      );
      const v = Math.round(2048 * (0.5 - Math.asin(d.y) / Math.PI));
      const p = mapContext.getImageData(u, v, 1, 1).data;
      selectedCountryId = p[0];

      let countryCode = "";
      for (let key in countryColorMap) {
        if (countryColorMap[key] === selectedCountryId) {
          // console.log(`${key}: ${selectedCountryId}`);
          countryCode = key;
        }
      }

      const countryObj = countryByCode.filter(
        (obj) => obj.abbreviation === countryCode
      )[0];
      if (countryObj) {
        const countryName = countryObj.country;
        // console.log("COUNTRY NAME:", countryName);
        // dispatch(setCountryName(countryName));
        window.dispatchEvent(
          new CustomEvent("dispatchSetCountryName", {
            detail: { countryName },
          })
        );

        const continentObj = countryByContinent.filter(
          (obj) => obj.country === countryName
        )[0];
        if (continentObj) {
          const continentName = continentObj.continent;
          // console.log("CONTINENT NAME:", continentName);
          // dispatch(setContinentName(continentName));
          window.dispatchEvent(
            new CustomEvent("dispatchSetContinentName", {
              detail: { continentName },
            })
          );
        }
      }

      lookupContext.clearRect(0, 0, 256, 1);

      for (let i = 0; i < 228; i++) {
        if (i == 0) lookupContext.fillStyle = "rgba(0,0,0,1.0)";
        else if (i == selectedCountryId)
          lookupContext.fillStyle = "rgba(50,50,0,0.5)";
        else lookupContext.fillStyle = "rgba(0,0,0,1.0)";

        lookupContext.fillRect(i, 0, 1, 1);
      }

      lookupTexture.needsUpdate = true;
    }
  } catch (error) {
    console.log(`ошибка выполнения earthClickEvent`, error);
  }
};

const earthAnimation = (canvas) =>
  function animation() {
    const { getModel } = canvas.getEventControllers();

    const earth = getModel("earth");
    if (earth === undefined) return;

    earth.getObjectByName("surface").rotation.y += (1 / 32) * 0.01;
    earth.getObjectByName("atmosphere").rotation.y += 1 * 0.01;

    window.requestAnimationFrame(animation);
  };

export const earthEvents = [
  {
    function: earthClickEvent,
    type: "click",
    name: "earth_click",
    addInRequestAnimation: false,
  },
  {
    function: earthAnimation,
    type: "",
    name: "earth_animation",
    addInRequestAnimation: false,
    haveInnerRequestAnimationFunction: false,
  },
];
