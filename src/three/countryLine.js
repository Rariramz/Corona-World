import * as THREE from "three";
import { lon2xyz } from "./lon2xyz.js";

const makePolygonBorder = (points) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const vertices = new Float32Array(points);
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  const material = new THREE.LineBasicMaterial({
    color: "red",
  });
  const line = new THREE.LineLoop(geometry, material);
  return line;
};

const makePolygonArea = (points3, points) => {
  const countryShape = new THREE.Shape(points3);
  const geometry = new THREE.ShapeGeometry(countryShape);

  const vertices = new Float32Array(points);
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;

  const material = new THREE.MeshNormalMaterial({
    wireframe: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

// export const countryLine1 = (polygonArr) => {
//   const group = new THREE.Group();
//   polygonArr.forEach((polygon) => {
//     const pointArr = [];
//     polygon[0].forEach((elem) => {
//       const coord = lon2xyz(elem[0], elem[1]);
//       pointArr.push(coord.x, coord.y, coord.z);
//     });
//     group.add(line(pointArr));
//   });
//   return group;
// };

export const getThreeJsCountry = (countryPolygonsArray) => {
  const group = new THREE.Group();

  countryPolygonsArray.forEach((polygon) => {
    const polygonBorderPoints = []; //+
    const polygonBorderPoints3 = [];

    polygon[0].forEach((coordinatesPoint) => {
      console.log(coordinatesPoint);
      const coordinates = lon2xyz(coordinatesPoint[0], coordinatesPoint[1]);
      polygonBorderPoints.push(coordinates.x, coordinates.y, coordinates.z); //+
      polygonBorderPoints3.push(
        new THREE.Vector3(coordinates.x, coordinates.y, coordinates.z)
      );
    });

    group.add(makePolygonArea(polygonBorderPoints3, polygonBorderPoints));
    group.add(makePolygonBorder(polygonBorderPoints)); //+
  });

  return group;
};
