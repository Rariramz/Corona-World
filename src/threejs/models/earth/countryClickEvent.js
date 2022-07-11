import countryByCode from "../../../geojson/countryByCode";
import countryByContinent from "../../../geojson/countryByContinent";
import { store } from "../../../redux";
import {
  setCountryName,
  setContinentName,
} from "../../../redux/userSelected/userSelectedSlice";
import {
  lookupContext,
  lookupTexture,
  mapContext,
} from "./countriesShaderMaterial";
import { countryColorMap } from "./countryColorMap";

export const earthClickEvent = (canvas) => (event) => {
  event.preventDefault();

  const { getIntersects, getModel } = canvas.getEventControllers();

  const earth = getModel("earth");
  if (earth === undefined) return;

  try {
    let selectedCountryId = -1;

    const intersects = getIntersects({
      mouseCoordinates: { x: event.clientX, y: event.clientY },
      object: earth,
    });

    if (intersects.length > 0) {
      const data = intersects[0];
      const d = data.point.clone().normalize();
      const u = Math.round(
        4096 * (1 - (0.5 + Math.atan2(d.z, d.x) / (2 * Math.PI)))
      );
      const v = Math.round(2048 * (0.5 - Math.asin(d.y) / Math.PI));
      const p = mapContext.getImageData(u, v, 1, 1).data;
      selectedCountryId = p[0];

      let countryCode = "";
      for (let key in countryColorMap) {
        if (countryColorMap[key] === selectedCountryId) {
          countryCode = key;
        }
      }

      const countryObj = countryByCode.filter(
        (obj) => obj.abbreviation === countryCode
      )[0];
      if (countryObj) {
        const countryName = countryObj.country;
        store.dispatch(setCountryName(countryName));

        const continentObj = countryByContinent.filter(
          (obj) => obj.country === countryName
        )[0];
        if (continentObj) {
          const continentName = continentObj.continent;
          store.dispatch(setContinentName(continentName));
        }
      }

      lookupContext.clearRect(0, 0, 256, 1);

      for (let i = 0; i < 228; i++) {
        if (i == 0) lookupContext.fillStyle = "rgba(0,0,0,1.0)";
        else if (i == selectedCountryId)
          lookupContext.fillStyle = "rgb(56, 117, 229)";
        else lookupContext.fillStyle = "rgba(0,0,0,1.0)";

        lookupContext.fillRect(i, 0, 1, 1);
      }

      lookupTexture.needsUpdate = true;
    }
  } catch (error) {
    console.log(`ошибка выполнения earthClickEvent`, error);
  }
};
