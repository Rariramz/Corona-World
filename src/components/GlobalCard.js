import { React, useEffect } from "react";

import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import warningImg from "../images/warning.png";
import { useGetGlobalDataQuery } from "../redux/global/globalSlice";

const GlobalCard = () => {
  const {
    startedTimeStamp,
    data,
    isError,
    error,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetGlobalDataQuery("", { pollingInterval: 5000 });

  return isSuccess ? (
    <div className="globalInfo__row row">
      <div className="horizontal-panel panel">
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={casesImg} alt="icon" />
            <div className="point__title point__title_high">CASES</div>
          </div>
          <div className="point__info point__info_red">
            {data.cases.toLocaleString()}
          </div>
        </div>
        <div className="horizontal-panel__point point">
          <div className="row">
            <img className="point__img row__img" src={deathsImg} alt="icon" />
            <div className="point__title point__title_high">DEATHS</div>
          </div>
          <div className="point__info point__info_red">
            {data.deaths.toLocaleString()}
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
            {data.recovered.toLocaleString()}
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
            {isError ? (
              <div className="point__info">
                {error.status}: {error.data.message}
              </div>
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
