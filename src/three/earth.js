import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Earth extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    this.mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "grey" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const materialX = new THREE.LineBasicMaterial({ color: "blue" });
    const geometryX = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(100, 0, 0),
    ]);
    const lineX = new THREE.Line(geometryX, materialX);
    scene.add(lineX);

    const materialY = new THREE.LineBasicMaterial({ color: "yellow" });
    const geometryY = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 100, 0),
    ]);
    const lineY = new THREE.Line(geometryY, materialY);
    scene.add(lineY);

    const materialZ = new THREE.LineBasicMaterial({ color: "coral" });
    const geometryZ = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 100),
    ]);
    const lineZ = new THREE.Line(geometryZ, materialZ);
    scene.add(lineZ);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }

  render() {
    return <div className="canvas" ref={(ref) => (this.mount = ref)}></div>;
  }
}

export default Earth;
