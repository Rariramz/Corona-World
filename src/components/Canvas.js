import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ThreeJS from "../threejs/ThreeJS";
import {
  setContinentName,
  setCountryName,
} from "../redux/userSelected/userSelectedSlice.js";
import { createEarth } from "../threejs/models/earth.js";
import { earthEvents } from "../threejs/helpers/countriesShaderMaterial.js";
import { createGalaxy } from "../threejs/models/galaxy.js";

const Canvas = () => {
  const dispatch = useDispatch();

  // реф для ссылки на контейнер для монтажа canvas
  const canvasContainer = useRef(null);

  // получаем размеры для рендера сцены
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  // создаю нужную камеру
  const camera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    return camera;
  }, [width, height]);

  // создает экземпляр объекта работы 3js
  const canvas = useRef(new ThreeJS(camera, width, height, true));

  // настраиваем основные элементы сцены и запускаем в рендер
  useEffect(() => {
    const threejsObject = canvas.current;
    threejsObject.init(canvasContainer.current, true, true);
    threejsObject.addLights([
      new THREE.AmbientLight(0xbbbbbb, 0.6),
      new THREE.SpotLight(0xffffff, 1, 0, 10, 2).position.set(2, 0, 1),
    ]);

    // создает подписку на ресайз
    threejsObject.startWindowResize();

    // добавление элементов
    threejsObject.addElement({
      element: createGalaxy(),
      name: "galaxy",
    });
    threejsObject.addElement({
      element: createEarth(),
      name: "earth",
      events: earthEvents,
    });

    console.log(threejsObject);
    // старт работы событий
    threejsObject.startAnimation();

    // удалить ресайз при размонтировании компоненты
    return threejsObject.stopWindowResize;
  }, []);

  return <div ref={canvasContainer} className="canvas" />;
};

export default Canvas;
