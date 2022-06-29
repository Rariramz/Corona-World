import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import earthImg from "../images/earth-blue-marble.jpg";
import earthDayImg from "../images/earth-day.jpg";
import earthCountriesShadesImg from "../images/earth-index-shifted-gray.png";
import earthCountriesOutlinesImg from "../images/earth-outline-shifted-gray.png";
import ThreeJS from "../threejs/ThreeJS";
import { vertexShader } from "../threejs/shaders/vertex.js";
import { fragmentShader } from "../threejs/shaders/fragment.js";
import { countryColorMap } from "../threejs/countryColorMap.js";
import { useDispatch } from "react-redux";
import {
  setContinentName,
  setCountryName,
} from "../redux/userSelected/userSelectedSlice.js";
import countriesJson from "../geojson/world";
import countriesContinentsJson from "../geojson/countries&continents";

const Canvas = () => {
  const dispatch = useDispatch();

  // реф для ссылки на контейнер для монтажа canvas
  const canvasContainer = useRef(null);

  // получаем размеры для рендера сцены
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  // создаю нужную камеру
  const camera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);
    camera.position.set(0, 0, 400);
    camera.lookAt(0, 0, 0);
    return camera;
  }, [width, height]);

  // создает экземпляр объекта работы 3js
  const canvas = useRef(new ThreeJS(camera, width, height));

  // настраиваем основные элементы сцены и запускаем в рендер
  useEffect(() => {
    const threejsObject = canvas.current;
    threejsObject.init(canvasContainer.current, true, true);
    threejsObject.addLights();

    // создает подписку на ресайз
    threejsObject.startWindowResize();

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

    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        width: { type: "f", value: window.innerWidth },
        height: { type: "f", value: window.innerHeight },
        mapIndex: { type: "t", value: mapTexture },
        outline: { type: "t", value: outlineTexture },
        lookup: { type: "t", value: lookupTexture },
        blendImage: { type: "t", value: blendImage },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const geometry = new THREE.SphereGeometry(100, 64, 32);
    const mesh = new THREE.Mesh(geometry, planeMaterial);
    mesh.position.set(0, 0, 0);
    threejsObject.addElement({
      element: mesh,
      name: "globe",
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

    window.addEventListener("mousedown", onMouseClick, false);

    function onMouseClick(event) {
      const intersectionList = threejsObject.getIntersects(
        { x: event.clientX, y: event.clientY },
        mesh
      );
      let countryCode = -1;
      if (intersectionList.length > 0) {
        const data = intersectionList[0];
        const d = data.point.clone().normalize();
        const u = Math.round(
          4096 * (1 - (0.5 + Math.atan2(d.z, d.x) / (2 * Math.PI)))
        );
        const v = Math.round(2048 * (0.5 - Math.asin(d.y) / Math.PI));
        const p = mapContext.getImageData(u, v, 1, 1).data;
        countryCode = p[0];

        let ISO_A2 = "";
        for (let key in countryColorMap) {
          if (countryColorMap[key] === countryCode) {
            console.log(`${key}: ${countryCode}`);
            ISO_A2 = key;
          }
        } // end for loop

        const countryObj = countriesJson.features.filter(
          (obj) => obj.properties.ISO_A2 === ISO_A2
        )[0];
        if (countryObj) {
          const countryName = countryObj.properties.NAME_LONG;
          console.log("COUNTRY NAME:", countryName);
          dispatch(setCountryName(countryName));

          const continentObj = countriesContinentsJson.filter(
            (obj) => obj.country === countryName
          )[0];
          if (continentObj) {
            const continentName = continentObj.continent;
            console.log("CONTINENT NAME:", continentName);
            dispatch(setContinentName(continentName));
          }
        }

        lookupContext.clearRect(0, 0, 256, 1);

        for (let i = 0; i < 228; i++) {
          if (i == 0) lookupContext.fillStyle = "rgba(0,0,0,1.0)";
          else if (i == countryCode)
            lookupContext.fillStyle = "rgba(50,50,0,0.5)";
          else lookupContext.fillStyle = "rgba(0,0,0,1.0)";

          lookupContext.fillRect(i, 0, 1, 1);
        }

        lookupTexture.needsUpdate = true;
      }
    } // end mouseClick function
    // ------------------------------------------------------------------------------------------------

    // старт работы событий
    threejsObject.startAnimation();

    // удалить ресайз при размонтировании компоненты
    return threejsObject.stopWindowResize;
  }, []);

  return <div ref={canvasContainer} className="canvas" />;
};

export default Canvas;
