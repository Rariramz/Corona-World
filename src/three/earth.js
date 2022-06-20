import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ThreeGlobe from "three-globe";
import earthImg from "../images/earth-blue-marble.jpg";

class Earth extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100000
    );
    camera.position.set(0, 0, 400);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    this.mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const globe = new ThreeGlobe()
      .globeImageUrl(earthImg)
      .showGlobe(true)
      .showGraticules(true);
    scene.add(globe);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y -= 0.001;
      renderer.render(scene, camera);
    };
    animate();
  }

  render() {
    return <div className="canvas" ref={(ref) => (this.mount = ref)}></div>;
  }
}

export default Earth;
