import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCountryData,
  setReduxCountryName,
} from "../redux/country/countrySlice.js";

import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";

import {
  useCountryName,
  useCountryTotals,
  useCountryError,
} from "../redux/country/countrySelectors.js";

const CountryCard = () => {
  const dispatch = useDispatch();
  const countryName = useCountryName();
  const countryTotals = useCountryTotals();
  const countryError = useCountryError();

  useEffect(() => {
    dispatch(setReduxCountryName(localStorage.getItem("countryName")));
  }, []);

  useEffect(() => {
    if (countryName) dispatch(fetchCountryData(countryName));
  }, [countryName]);

  // const selectCountryParams = createSelector(
  //   (state) => state.country.countryTotals,
  //   (country) => ({
  //     active: country.active,
  //     cases: country.cases,
  //     country: country.country,
  //     countryInfo: country.countryInfo,
  //     deaths: country.deaths,
  //     population: country.population,
  //     recovered: country.recovered,
  //     tests: country.tests,
  //     todayCases: country.todayCases,
  //     todayDeaths: country.todayDeaths,
  //     todayRecovered: country.todayRecovered,
  //   })
  // );

  return countryName && !countryError ? (
    <div className="countryInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__img country-flag__mask">
            <img
              className="country-flag__img"
              src={countryTotals?.countryInfo.flag}
            />
          </div>
          <div className="point__title point__title_high country-name">
            {countryTotals?.country.toUpperCase()}
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.population.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">active:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.active.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">tests:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.tests.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today cases:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.todayCases.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today deaths:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.todayDeaths.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today recovered:&nbsp;</div>
            <div className="point__info">
              {countryTotals?.todayRecovered.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={casesImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryTotals?.cases.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={deathsImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryTotals?.deaths.toLocaleString()}
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
              {countryTotals?.recovered.toLocaleString()}
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
            <div className="point__info">{countryError?.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
