import React, { useEffect, useState } from "react";
import { getCountryData } from "../http/API";
import "./totals.css";
import populationImg from "../images/group.png";
import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/regeneration.png";
import InfoPoint from "./InfoPoint";

const CountryTotals = ({ country }) => {
  const [countryFlag, setCountryFlag] = useState("");
  const [countryName, setCountryName] = useState("");
  const [population, setPopulation] = useState(0);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getCountryData(country, setTotals);
  }, []);

  const setTotals = ({
    population,
    cases,
    deaths,
    recovered,
    country,
    countryInfo,
  }) => {
    setCountryFlag(countryInfo.flag);
    setCountryName(country);
    setPopulation(population);
    setCases(cases);
    setDeaths(deaths);
    setRecovered(recovered);
    setCountryData([
      { img: populationImg, title: "Population", data: population },
      { img: casesImg, title: "Total Cases", data: cases },
      { img: deathsImg, title: "Total Deaths", data: deaths },
      { img: recoveredImg, title: "Total Recovered", data: recovered },
    ]);
  };

  return (
    <div className="column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__img country-flag__mask">
            <img className="country-flag__img" src={countryFlag} />
          </div>
          <div className="point__title country-name">{countryName}</div>
        </div>
        {countryData.map(({ img, title, data }) => (
          <div className="vertical-panel__point point" key={title}>
            <InfoPoint img={img} title={title} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryTotals;
