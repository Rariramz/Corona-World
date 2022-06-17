import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReduxContinentName } from "../redux/continent/continentSlice.js";
import { setReduxCountryName } from "../redux/country/countrySlice.js";

const TestButtons = () => {
  const dispatch = useDispatch();

  const handlerCountry = (e) => {
    const countryName = e.target.innerText;
    localStorage.setItem("countryName", countryName);
    dispatch(setReduxCountryName(localStorage.getItem("countryName")));
  };
  const handlerContinent = (e) => {
    const continentName = e.target.innerText;
    localStorage.setItem("continentName", continentName);
    dispatch(setReduxContinentName(localStorage.getItem("continentName")));
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
          top: "-400px",
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
