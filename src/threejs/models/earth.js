import * as THREE from "three";
import { countryColorMap } from "../helpers/countryColorMap.js";
import countryByCode from "../../geojson/countryByCode";
import countryByContinent from "../../geojson/countryByContinent";

import earthMap1K from "../../images/earth-blue-marble.jpg";
// import earthMap1K from "../../images/earthmap1k.jpg";
import earthBump1K from "../../images/earthbump1k.jpg";
import earthSpec1K from "../../images/earthspec1k.jpg";
import earthCloudMap from "../../images/earthcloudmap.jpg";
import earthCloudMapTrans from "../../images/earthcloudmaptrans.jpg";

import { countriesShaderMaterial } from "../helpers/countriesShaderMaterial.js";

export const createEarth = () => {
  const options = {
    surface: {
      size: 0.5,
      material: {
        bumpScale: 0.05,
        specular: new THREE.Color("grey"),
        shininess: 10,
      },
      textures: {
        map: earthMap1K,
        bumpMap: earthBump1K,
        specularMap: earthSpec1K,
      },
    },
    atmosphere: {
      size: 0.003,
      material: {
        opacity: 0.2,
      },
      textures: {
        map: earthCloudMap,
        alphaMap: earthCloudMapTrans,
      },
      glow: {
        size: 0.02,
        intensity: 0.1,
        fade: 7,
        color: 0x93cfef,
      },
    },
  };

  // Create the planet's Surface
  const surfaceGeometry = new THREE.SphereGeometry(options.surface.size);
  const surfaceMaterial = countriesShaderMaterial; //new THREE.MeshPhongMaterial(options.surface.material);
  const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

  // Create the planet's Atmosphere
  const atmosphereGeometry = new THREE.SphereGeometry(
    options.surface.size + options.atmosphere.size,
    32,
    32
  );
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    ...options.atmosphere.material,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  // Create the planet's Atmospheric glow
  const atmosphericGlowGeometry = new THREE.SphereGeometry(
    options.surface.size +
      options.atmosphere.size +
      options.atmosphere.glow.size,
    32,
    32
  );
  const atmosphericGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: {
        type: "f",
        value: options.atmosphere.glow.intensity,
      },
      p: {
        type: "f",
        value: options.atmosphere.glow.fade,
      },
      glowColor: {
        type: "c",
        value: new THREE.Color(options.atmosphere.glow.color),
      },
      viewVector: {
        type: "v3",
        value: [1, 1, 1], //camera.position
      },
    },
    vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
    fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main()
          {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
          }`,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  const atmosphericGlow = new THREE.Mesh(
    atmosphericGlowGeometry,
    atmosphericGlowMaterial
  );

  // Show countries
  const countriesGeometry = new THREE.SphereGeometry(options.surface.size);
  const countriesMaterial = countriesShaderMaterial;
  const countries = new THREE.Mesh(countriesGeometry, countriesMaterial);

  // Nest the planet's Surface and Atmosphere into a planet object
  const planet = new THREE.Group();
  surface.name = "surface";
  atmosphere.name = "atmosphere";
  atmosphericGlow.name = "atmosphericGlow";
  countries.name = "countries";
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow);
  planet.add(countries);

  // Load the Surface's textures
  for (let textureProperty in options.surface.textures) {
    const texture = new THREE.TextureLoader().load(
      options.surface.textures[textureProperty]
    );
    surfaceMaterial[textureProperty] = texture;
    surfaceMaterial.needsUpdate = true;
  }

  // Load the Atmosphere's texture
  for (let textureProperty in options.atmosphere.textures) {
    const texture = new THREE.TextureLoader().load(
      options.atmosphere.textures[textureProperty]
    );
    atmosphereMaterial[textureProperty] = texture;
    atmosphereMaterial.needsUpdate = true;
  }

  planet.receiveShadow = true;
  planet.castShadow = true;
  planet.getObjectByName("surface").geometry.center();

  return planet;
};

// ---------------------------------------------------------------------------- ORIGINAL
// Main render function
// let render = function () {
//   earth.getObjectByName("surface").rotation.y += (1 / 32) * 0.01;
//   earth.getObjectByName("atmosphere").rotation.y += (1 / 16) * 0.01;
//   if (cameraAutoRotation) {
//     cameraRotation += cameraRotationSpeed;
//     camera.position.y = 0;
//     camera.position.x = 2 * Math.sin(cameraRotation);
//     camera.position.z = 2 * Math.cos(cameraRotation);
//     camera.lookAt(earth.position);
//   }
//   requestAnimationFrame(render);
//   renderer.render(scene, camera);
// };
