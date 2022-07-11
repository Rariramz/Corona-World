import * as THREE from "three";

import earthMap1K from "../../../images/earth-textures/earth-blue-marble.jpg";
// import earthMap1K from "../../images/earth-textures/earthmap1k.jpg";
import earthBump1K from "../../../images/earth-textures/earthbump1k.jpg";
import earthSpec1K from "../../../images/earth-textures/earthspec1k.jpg";
import earthCloudMap from "../../../images/earth-textures/earthcloudmap.jpg";
import earthCloudMapTrans from "../../../images/earth-textures/earthcloudmaptrans.jpg";

import { countriesShaderMaterial } from "./countriesShaderMaterial.js";

export const createEarth = (camera) => {
  const options = {
    surface: {
      size: 0.5,
      widthSegments: 360,
      heightSegments: 360,
      material: {
        bumpScale: 0.05,
        specular: new THREE.Color("grey"),
        shininess: 1,
      },
      textures: {
        map: earthMap1K,
        bumpMap: earthBump1K,
        specularMap: earthSpec1K,
      },
    },
    atmosphere: {
      size: 0.01,
      material: {
        opacity: 0.3,
      },
      textures: {
        map: earthCloudMap,
        alphaMap: earthCloudMapTrans,
      },
      glow: {
        size: 0.04,
        intensity: 0.8,
        fade: 10,
        color: "rgb(100,149,237)",
      },
    },
  };

  // Create the planet's Surface
  const surfaceGeometry = new THREE.SphereGeometry(
    options.surface.size,
    options.surface.widthSegments,
    options.surface.heightSegments
  );
  const surfaceMaterial = new THREE.MeshPhongMaterial(options.surface.material);
  const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

  // Show countries
  const countriesGeometry = new THREE.SphereGeometry(
    options.surface.size + 0.001,
    options.surface.widthSegments,
    options.surface.heightSegments
  );
  const countriesMaterial = countriesShaderMaterial;
  const countries = new THREE.Mesh(countriesGeometry, countriesMaterial);

  // Create the planet's Atmosphere
  const atmosphereGeometry = new THREE.SphereGeometry(
    options.surface.size + options.atmosphere.size,
    options.surface.widthSegments,
    options.surface.heightSegments
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
    options.surface.widthSegments,
    options.surface.heightSegments
  );
  const atmosphericGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      intensity: {
        type: "f",
        value: options.atmosphere.glow.intensity,
      },
      fade: {
        type: "f",
        value: options.atmosphere.glow.fade,
      },
      glowColor: {
        type: "c",
        value: new THREE.Color(options.atmosphere.glow.color),
      },
      viewVector: {
        type: "v3",
        value: camera.position,
      },
    },
    vertexShader: `
          uniform vec3 viewVector;

          varying vec3 vertexNormal;
          varying vec3 vUv;

          void main() {
            vertexNormal = normalize( normalMatrix * normal );
            vUv = normalize( normalMatrix * viewVector );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
    fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          uniform float fade;

          varying vec3 vertexNormal;
          varying vec3 vUv;

          void main()
          {
            float brightness = intensity - dot(vertexNormal, vUv);
            vec3 atmosphere = glowColor * pow(brightness, fade);
            gl_FragColor = vec4( atmosphere, 0.3 );
          }`,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  const atmosphericGlow = new THREE.Mesh(
    atmosphericGlowGeometry,
    atmosphericGlowMaterial
  );

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

  // Nest the planet's Surface and Atmosphere into a planet object
  const planet = new THREE.Group();
  surface.name = "surface";
  countries.name = "countries";
  atmosphere.name = "atmosphere";
  atmosphericGlow.name = "atmosphericGlow";
  planet.add(surface);
  planet.add(countries);
  // planet.add(atmosphere);
  planet.add(atmosphericGlow);

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
