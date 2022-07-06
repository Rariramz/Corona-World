//  Класс расширяющий Core методами настройки и добавления элементов
import * as THREE from "three";
import { Core } from "./Core";

export default class ThreeJS extends Core {
  constructor(camera, width, height, cameraAutoRotation = false) {
    super(camera, width, height);
    this.width = width;
    this.height = height;
    this.camera = camera;

    this.addElement = this.addElement.bind(this);
    this.addLights = this.addLights.bind(this);
    this.getModel = this.getModel.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.getEventControllers = this.getEventControllers.bind(this);
    this.getIntersects = this.getIntersects.bind(this);
  }

  addElement = ({
    element,
    name,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    events,
  }) => {
    /**
     * В случае попытки перезаписи модели выдать ошибку и выйти из функции
     */
    if (name in this.elements.groups || name in this.elements.elements) {
      console.error(`нельзя перезаписать элемент ${name}`);
      return;
    }
    /**
     * Добавляем элемент в хранилище экземпляра
     */
    const group = new THREE.Group();

    if (element instanceof Array) group.add(...element);
    if (element instanceof THREE.Mesh) group.add(element);

    this.elements.groups[name] =
      element instanceof THREE.Group ? element : group;

    /**
     * Добавляем события
     */
    if (events) this.addEvents(events);

    /**
     * Устанавливаем параметры объекта ( группы )
     */
    this.elements.groups[name].position.set(...position);
    this.elements.groups[name].rotation.set(...rotation);
    this.elements.groups[name].scale.set(...scale);

    /**
     * Добавляем группу в сцену
     */
    this.scene.add(this.elements.groups[name]);
  };

  addEvents = (events) => {
    if (!events || !(events instanceof Array)) return;

    const controller = this.eventController;

    events.forEach((event) => {
      if (
        !(event.name in controller.events.inAnimationFrame) &&
        !(event.name in controller.events.inEventListener)
      ) {
        event.addInRequestAnimation && !event.haveInnerRequestAnimationFunction
          ? (controller.events.inAnimationFrame[event.name] = {
              function: event.function(this),
            })
          : (controller.events.inEventListener[event.name] = {
              function: event.function(this),
              type: event.type,
            });

        if (event.haveInnerRequestAnimationFunction) {
          const { listener, animationsFramesFunction } = event.function(this);
          controller.events.inEventListener[event.name] = {
            function: listener,
            type: event.type,
          };
          controller.events.inAnimationFrame[event.name] = {
            function: animationsFramesFunction,
          };
        }

        if (controller.eventWorkStatus) {
          this.canvas.addEventListener(
            controller.events.inEventListener[event.name].type,
            controller.events.inEventListener[event.name].function,
            false
          );
        }
      } else console.error(`вы попытались перезаписать event ${event.name}`);
    });
  };

  getEventControllers = () => {
    return {
      getIntersects: this.getIntersects,
      getModel: this.getModel,
    };
  };

  // добавляет свет в сцену
  addLights = (lights) => {
    lights.forEach((light) => this.scene.add(light));
  };
  // ---------------------------------------------------------------------------------------------------

  getModel = (name) => {
    return (
      this.elements.groups?.[name] ||
      this.elements.elements?.[name] ||
      undefined
    );
  };

  //  raycaster object (объект пересечения с элементом)
  getIntersects = ({ mouseCoordinates, object }) => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const Crx = (mouseCoordinates.x / this.width) * 2 - 1;
    const Cry = -(mouseCoordinates.y / this.height) * 2 + 1;

    pointer.set(Crx, Cry);

    raycaster.setFromCamera(pointer, this.camera);
    const intersects = raycaster.intersectObject(object);

    // object - объект проверяемый на пересечение с узлом
    return intersects;
  };
}
