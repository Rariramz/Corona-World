import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getCountryState } from "./countryStateAPI.js";

const storeCountryName = createSelector(
  getCountryState,
  (state) => state.countryName
);
const storeCountryError = createSelector(
  getCountryState,
  (state) => state.error
);
const storeCountryTotals = createSelector(
  getCountryState,
  (state) => state.countryTotals
);

export const storeCountry = createSelector(
  getCountryState,
  (data) => data.countryTotals.active
);

export const useCountryName = () => useSelector(storeCountryName);
export const useCountryError = () => useSelector(storeCountryError);
export const useCountryTotals = () => useSelector(storeCountryTotals);
