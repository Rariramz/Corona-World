import React, { useEffect, useState } from "react";
import "./totals.css";
import { getGlobalData } from "../http/API";
import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/regeneration.png";
import InfoPoint from "./InfoPoint";

const GlobalTotals = () => {
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getGlobalData(setTotals);
  }, []);

  const setTotals = ({ cases, deaths, recovered }) => {
    setCases(cases);
    setDeaths(deaths);
    setRecovered(recovered);
    setCountryData([
      { img: casesImg, title: "Total Cases", data: cases },
      { img: deathsImg, title: "Total Deaths", data: deaths },
      { img: recoveredImg, title: "Total Recovered", data: recovered },
    ]);
  };

  return (
    <div className="row">
      <div className="horizontal-panel panel">
        {countryData.map(({ img, title, data }) => (
          <div className="horizontal-panel__point point" key={title}>
            <InfoPoint img={img} title={title} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalTotals;
