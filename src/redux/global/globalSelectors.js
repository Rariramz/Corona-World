import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getGlobalState } from "./globalStateAPI.js";

const storeGlobalTotals = createSelector(
  getGlobalState,
  (state) => state.globalTotals
);

const storeGlobalError = createSelector(getGlobalState, (state) => state.error);

export const useGlobalTotals = () => useSelector(storeGlobalTotals);
export const useGlobalError = () => useSelector(storeGlobalError);
