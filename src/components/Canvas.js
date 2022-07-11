import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setContinentName,
  setCountryName,
} from "../redux/userSelected/userSelectedSlice.js";
import ThreeJS from "../threejs/ThreeJS";
import { createEarth } from "../threejs/models/earth/earth.js";
import { createGalaxy } from "../threejs/models/galaxy/galaxy.js";
import { earthClickEvent } from "../threejs/models/earth/countryClickEvent.js";

const Canvas = () => {
  // реф для ссылки на контейнер для монтажа canvas
  const canvasContainer = useRef(null);

  // получаем размеры для рендера сцены
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  // создаю нужную камеру
  const camera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    return camera;
  }, [width, height]);

  // создает экземпляр объекта работы 3js
  const canvas = useRef(new ThreeJS(camera, width, height));

  // настраиваем основные элементы сцены и запускаем в рендер
  useEffect(() => {
    const threejsObject = canvas.current;
    threejsObject.init(canvasContainer.current, true, true);

    // CAMERA POSITION
    threejsObject.tornPerspectiveCamera([1, 1, 1]);

    // LIGHTS
    const redLight = new THREE.DirectionalLight("red", 0.2);
    redLight.position.set(100, 100, -100);

    const ambientLight = new THREE.AmbientLight("rgb(240,248,255)", 0.3);

    const blueLight = new THREE.DirectionalLight("rgb(100,149,237)", 0.5);
    blueLight.position.set(100, 0, 10);

    threejsObject.addLights([redLight, blueLight, ambientLight]);

    // ROTATION
    threejsObject.addAutoRotation({
      autoRotateSpeed: 0.1,
      rotateSpeed: 1,
      minPolarAngle: 1,
      maxPolarAngle: 2,
      maxDistance: 5,
      minDistance: 1.2,
      enableDamping: true,
      dampingFactor: 0.05,
      enablePan: true,
      panSpeed: 1,
    });

    // ELEMENTS
    const earth = createEarth(camera);

    const earthEvents = [
      {
        function: earthClickEvent,
        type: "click",
        name: "earth_click",
        addInRequestAnimation: false,
      },
    ];

    threejsObject.addElement({
      element: createGalaxy(),
      name: "galaxy",
    });

    threejsObject.addElement({
      element: earth,
      name: "earth",
      events: earthEvents,
    });

    // создает подписку на ресайз
    threejsObject.startWindowResize();

    // старт работы событий
    threejsObject.startAnimation();

    // удалить ресайз при размонтировании компоненты
    return threejsObject.stopWindowResize;
  }, []);

  return <div ref={canvasContainer} className="canvas" />;
};

export default Canvas;
