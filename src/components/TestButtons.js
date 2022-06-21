import React from "react";
import { useDispatch } from "react-redux";
import {
  setContinentName,
  setCountryName,
} from "../redux/userSelected/userSelectedSlice.js";

const TestButtons = () => {
  const dispatch = useDispatch();

  const handlerCountry = (e) => {
    const countryName = e.target.innerText;
    dispatch(setCountryName(countryName));
  };
  const handlerContinent = (e) => {
    const continentName = e.target.innerText;
    dispatch(setContinentName(continentName));
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
          top: "-40%",
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
