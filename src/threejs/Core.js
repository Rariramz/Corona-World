import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Core {
  mountTime; // отражает не был ли смонтирован canvas в DOM
  elements;
  width;
  height;
  camera;
  eventController;
  clock;
  renderer;
  orbitControls;
  scene;
  canvas;
  updatable;

  constructor(camera, width, height) {
    this.eventController = {
      eventWorkStatus: false,
      events: {
        inAnimationFrame: {},
        inEventListener: {},
      },
    };

    this.camera = camera;
    this.scene = new THREE.Scene();
    this.width = width;
    this.height = height;
    this.mountTime = true;
    this.clock = new THREE.Clock();
    this.updatable = new Set();
    this.orbitControls = [];
    this.elements = {
      groups: {},
      elements: {},
    };

    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // для белого фона сцены
    });
    // this.orbitControls = new OrbitControls(
    //   this.camera,
    //   this.renderer.domElement
    // );
    // this.orbitControls.maxDistance = 400;
    // this.orbitControls.minDistance = 200;

    // создает тег canvas
    this.canvas = this.renderer.domElement;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.startWindowResize = this.startWindowResize.bind(this);
    this.stopWindowResize = this.stopWindowResize.bind(this);
    this.startEvents = this.startEvents.bind(this);
    this.stopEvents = this.stopEvents.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.tick = this.tick.bind(this);
  }

  // ---------------------------------------------------------------------------------------------------

  // метод инициации работы объекта.
  init = (container, isOrbitControls, shouldStartEvents) => {
    // устанавливает размеры
    this.renderer.setSize(this.width, this.height);

    // устанавливает orbitControl
    if (isOrbitControls) {
      this.orbitControls = [new OrbitControls(this.camera, this.canvas)];
    }

    this.startAnimation();

    // вставляет canvas в DOM ( в случае если монтажа уже не произошло )
    this.mountTime &&
      container.appendChild(this.canvas) &&
      (this.mountTime = false);

    if (shouldStartEvents) this.startEvents();
  };

  // ---------------------------------------------------------------------------------------------------

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  // добавляет подписку на ресайз на глобальный объект.
  startWindowResize = () => {
    window.addEventListener("resize", this.onWindowResize);
  };

  // удаляет подписку резайз с глобального объекта.
  stopWindowResize = () => {
    window.removeEventListener("resize", this.onWindowResize);
  };

  onWindowResize = () => {
    if (this.camera instanceof THREE.PerspectiveCamera)
      this.camera.aspect = window.innerWidth / window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // запускает и останавливает выполнение эвентов.
  startEvents = () => {
    const controller = this.eventController;

    /**
     * Выполнить участок только если до этого стояло false ,
     * что бы избежать повторного добавления событий.
     */
    if (!controller.eventWorkStatus) {
      controller.eventWorkStatus = true;

      // Добавляем все события
      Object.values(controller.events.inEventListener).forEach((event) => {
        this.canvas.addEventListener(event.type, event.function, false);
      });
    }
  };

  stopEvents = () => {
    const controller = this.eventController;

    /**
     * Выполнить участок только если до этого стояло true,
     * что бы избежать повторного удаления событий.
     */
    if (controller.eventWorkStatus) {
      controller.eventWorkStatus = false;

      Object.values(controller.events.inEventListener).forEach((event) => {
        this.canvas.removeEventListener(event.type, event.function, false);
      });
    }
  };

  // запускает анимацию , события и прочая деятельность (с подпиской на requestAnimationFrame ).
  // ОСТОРОЖНО !!! все попадающее сюда выполняется с частотой больше 16 раз в секунду.
  startAnimation = () => {
    this.renderer.render(this.scene, this.camera);

    // отрабатывают все эвенты проброшенные в объект events
    if (this.eventController.eventWorkStatus) {
      Object.values(this.eventController.events.inAnimationFrame).forEach(
        (eventFunction) => eventFunction.function()
      );
    }

    this.tick();

    window.requestAnimationFrame(this.startAnimation);
  };

  tick = () => {
    // only call the getDelta function once per frame!
    const delta = this.clock.getDelta();

    // console.log(
    //     `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    // for (const object of Array.from(this.updatable.values())) {
    //     object.tick(delta);
    // }

    for (const object of this.updatable) {
      object.tick(delta);
    }
  };
}
