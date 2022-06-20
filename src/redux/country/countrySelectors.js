import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getCountryState } from "./countryStateAPI.js";

const storeCountryTotals = createSelector(
  getCountryState,
  (state) => state.countryTotals
);

const storeCountryError = createSelector(
  getCountryState,
  (state) => state.error
);

export const useCountryTotals = () => useSelector(storeCountryTotals);
export const useCountryError = () => useSelector(storeCountryError);
