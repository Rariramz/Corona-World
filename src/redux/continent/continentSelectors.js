import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getContinentState } from "./continentStateAPI.js";

const storeContinentTotals = createSelector(
  getContinentState,
  (state) => state.continentTotals
);

const storeContinentError = createSelector(
  getContinentState,
  (state) => state.error
);

export const useContinentTotals = () => useSelector(storeContinentTotals);
export const useContinentError = () => useSelector(storeContinentError);
