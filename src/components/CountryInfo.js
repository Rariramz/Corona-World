import React, { useEffect, useState } from "react";
import { getCountryData } from "../http/API";
import { useSelector } from "react-redux";
import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";

const CountryInfo = () => {
  const storeCountry = useSelector((state) => state.country.countryName);

  const [countryName, setCountryName] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [countryPopulation, setCountryPopulation] = useState(0);
  const [countryCases, setCountryCases] = useState(0);
  const [countryDeaths, setCountryDeaths] = useState(0);
  const [countryRecovered, setCountryRecovered] = useState(0);

  useEffect(() => {
    getCountryData(storeCountry, setTotals);
  }, [storeCountry]);

  const setTotals = ({
    country,
    countryInfo,
    population,
    cases,
    deaths,
    recovered,
  }) => {
    setCountryName(country);
    setCountryFlag(countryInfo.flag);
    setCountryPopulation(population);
    setCountryCases(cases);
    setCountryDeaths(deaths);
    setCountryRecovered(recovered);
  };

  return (
    <div className="countryInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__img country-flag__mask">
            <img className="country-flag__img" src={countryFlag} />
          </div>
          <div className="point__title point__title_high country-name">
            {countryName?.toUpperCase()}
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryPopulation.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryPopulation.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryPopulation.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {countryPopulation.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={casesImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryCases.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={deathsImg} alt="icon" />
            <div className="point__info point__info_red">
              {countryDeaths.toLocaleString()}
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
              {countryRecovered.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
