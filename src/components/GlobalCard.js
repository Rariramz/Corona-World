import { React, useEffect } from "react";
import { useDispatch } from "react-redux";

import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import warningImg from "../images/warning.png";

import {
  useGlobalError,
  useGlobalTotals,
} from "../redux/global/globalSelectors.js";
import { fetchGlobalData } from "../redux/global/globalSlice.js";

const GlobalCard = () => {
  const dispatch = useDispatch();
  const globalTotals = useGlobalTotals();
  const globalError = useGlobalError();

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, []);

  return globalTotals && !globalError ? (
    <div className="globalInfo__row row">
      <div className="horizontal-panel panel">
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={casesImg} alt="icon" />
            <div className="point__title point__title_high">CASES</div>
          </div>
          <div className="point__info point__info_red">
            {globalTotals.cases.toLocaleString()}
          </div>
        </div>
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={deathsImg} alt="icon" />
            <div className="point__title point__title_high">DEATHS</div>
          </div>
          <div className="point__info point__info_red">
            {globalTotals.deaths.toLocaleString()}
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
            {globalTotals.recovered.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="globalInfo__row row">
      <div className="horizontal-panel panel">
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={warningImg} alt="icon" />
            {globalError ? (
              <div className="point__info">{globalError.message}</div>
            ) : (
              <div className="point__info">
                Global statistics are temporarily unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCard;
