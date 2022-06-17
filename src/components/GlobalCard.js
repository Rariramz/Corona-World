import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGlobalData } from "../redux/global/globalSlice.js";

import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import { useGlobalTotals } from "../redux/global/globalSelectors.js";

const GlobalCard = () => {
  const dispatch = useDispatch();
  const storeGlobalTotals = useSelector((state) => state.global.globalTotals);
  const globalTotals = useGlobalTotals();

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, []);

  return (
    <div className="globalInfo__row row">
      <div className="horizontal-panel panel">
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={casesImg} alt="icon" />
            <div className="point__title point__title_high">CASES</div>
          </div>
          <div className="point__info point__info_red">
            {globalTotals?.cases.toLocaleString()}
          </div>
        </div>
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={deathsImg} alt="icon" />
            <div className="point__title point__title_high">DEATHS</div>
          </div>
          <div className="point__info point__info_red">
            {globalTotals?.deaths.toLocaleString()}
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
            {globalTotals?.recovered.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCard;
