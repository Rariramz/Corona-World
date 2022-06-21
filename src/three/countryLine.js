import * as THREE from "three";
import { lon2xyz } from "./lon2xyz.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

const line = (points) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const vertices = new Float32Array(points);
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 1,
    linecap: "round",
    linejoin: "round",
    fog: true,
  });
  const line = new THREE.LineLoop(geometry, material);
  return line;
};

export const countryLine = (polygonArr) => {
  const group = new THREE.Group();
  polygonArr.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      const coord = lon2xyz(elem[0], elem[1]);
      pointArr.push(coord.x, coord.y, coord.z);
    });
    group.add(line(pointArr));
  });
  return group;
};
