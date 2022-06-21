import React, { useEffect, useState } from "react";
import { fetchCountryData } from "../redux/country/countrySlice.js";

import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import warningImg from "../images/warning.png";

import {
  useCountryTotals,
  useCountryError,
} from "../redux/country/countrySelectors.js";
import { useDispatch, useSelector } from "react-redux";

const CountryCard = () => {
  const dispatch = useDispatch();
  const countryName = useSelector((state) => state.userSelected.countryName);
  const countryTotals = useCountryTotals();
  const countryError = useCountryError();

  useEffect(() => {
    countryName && dispatch(fetchCountryData(countryName));
  }, [countryName]);

  return countryTotals && !countryError ? (
    <div className="countryInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__img country-flag__mask">
            <img
              className="country-flag__img"
              src={countryTotals.countryInfo.flag}
            />
          </div>
          <div className="point__title point__title_high country-name">
            {countryTotals.country.toUpperCase()}
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryTotals.population.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">active:&nbsp;</div>
            <div className="point__info">
              {countryTotals.active.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">tests:&nbsp;</div>
            <div className="point__info">
              {countryTotals.tests.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today cases:&nbsp;</div>
            <div className="point__info">
              {countryTotals.todayCases.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today deaths:&nbsp;</div>
            <div className="point__info">
              {countryTotals.todayDeaths.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today recovered:&nbsp;</div>
            <div className="point__info">
              {countryTotals.todayRecovered.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={casesImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryTotals.cases.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={deathsImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryTotals.deaths.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img
              className="row__img point__img"
              src={recoveredImg}
              alt="icon"
            />
            <div className="point__info point__info_red">
              {countryTotals.recovered.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="countryInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={warningImg} alt="icon" />
            {countryError ? (
              <div className="point__info">{countryError.message}</div>
            ) : (
              <div className="point__info">Choose country</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
