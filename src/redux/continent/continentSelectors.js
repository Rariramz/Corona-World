import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getContinentState } from "./continentStateAPI.js";

const storeContinentName = createSelector(
  getContinentState,
  (state) => state.continentName
);

const storeContinentTotals = createSelector(
  getContinentState,
  (state) => state.continentTotals
);

const storeContinentError = createSelector(
  getContinentState,
  (state) => state.continentError
);

export const useContinentName = () => useSelector(storeContinentName);
export const useContinentTotals = () => useSelector(storeContinentTotals);
export const useContinentError = () => useSelector(storeContinentError);
