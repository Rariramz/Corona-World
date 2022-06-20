import React from "react";
import { useDispatch } from "react-redux";
import { fetchContinentData } from "../redux/continent/continentSlice.js";
import { fetchCountryData } from "../redux/country/countrySlice.js";

const TestButtons = () => {
  const dispatch = useDispatch();

  const handlerCountry = (e) => {
    const countryName = e.target.innerText;
    dispatch(fetchCountryData(countryName));
  };
  const handlerContinent = (e) => {
    const continentName = e.target.innerText;
    dispatch(fetchContinentData(continentName));
  };
  return (
    <div className="row">
      <div
        className="column"
        style={{
          borderRadius: "5px",
          zIndex: "10",
          color: "#ffffff",
          position: "absolute",
          left: "50px",
          top: "-200px",
        }}
      >
        <button onClick={(e) => handlerCountry(e)}>Belarus</button>
        <button onClick={(e) => handlerCountry(e)}>China</button>
        <button onClick={(e) => handlerCountry(e)}>Unknown</button>
        <br />
        <button onClick={(e) => handlerContinent(e)}>Europe</button>
        <button onClick={(e) => handlerContinent(e)}>Africa</button>
        <button onClick={(e) => handlerContinent(e)}>Unknown</button>
      </div>
    </div>
  );
};

export default TestButtons;
