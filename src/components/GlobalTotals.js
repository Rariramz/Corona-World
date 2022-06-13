import React, { useEffect, useState } from "react";
import { getGlobalData } from "../http/API";
import { useSelector } from "react-redux";
import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";

const GlobalTotals = () => {
  const storeGlobal = useSelector((state) => state.global);

  const [globalCases, setGlobalCases] = useState(0);
  const [globalDeaths, setGlobalDeaths] = useState(0);
  const [globalRecovered, setGlobalRecovered] = useState(0);

  useEffect(() => {
    getGlobalData(setTotals);
  }, [...Object.values(storeGlobal)]);

  const setTotals = ({ cases, deaths, recovered }) => {
    setGlobalCases(cases);
    setGlobalDeaths(deaths);
    setGlobalRecovered(recovered);
  };

  return (
    <div className="globalInfo__row row">
      <div className="horizontal-panel panel">
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={casesImg} alt="icon" />
            <div className="point__title point__title_high">CASES</div>
          </div>
          <div className="point__info point__info_red">
            {globalCases.toLocaleString()}
          </div>
        </div>
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={deathsImg} alt="icon" />
            <div className="point__title point__title_high">DEATHS</div>
          </div>
          <div className="point__info point__info_red">
            {globalDeaths.toLocaleString()}
          </div>
        </div>
        <div className="horizontal-panel__point point">
          <div className="row">
            <img
              className="point__img row__img"
              src={recoveredImg}
              alt="icon"
            />
            <div className="point__title point__title_high">RECOVERED</div>
          </div>
          <div className="point__info point__info_red">
            {globalRecovered.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTotals;
