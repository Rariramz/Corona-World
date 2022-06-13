import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountryName } from "../redux/countryReducer";

const TestButtons = () => {
  const storeCountry = useSelector((state) => state.country.countryName);
  const dispatch = useDispatch();

  const handlerCountry = (e) => {
    const countryName = e.target.innerText;
    dispatch(setCountryName(countryName));
  };

  return (
    <div style={{ zIndex: "100", color: "#ffffff" }}>
      <h3>Selected: {storeCountry}</h3>
      <button onClick={(e) => handlerCountry(e)}>Belarus</button>
      <br />
      <button onClick={(e) => handlerCountry(e)}>China</button>
      <hr />
    </div>
  );
};

export default TestButtons;
