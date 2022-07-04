import * as THREE from "three";
import starfield from "../../images/starfield.png";

export const createGalaxy = () => {
  const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
  const textureStars = new THREE.TextureLoader().load(starfield);
  const galaxyMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: textureStars,
  });
  const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
  return galaxy;
};
