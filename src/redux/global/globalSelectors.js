import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getGlobalState } from "./globalStateAPI.js";

const storeGlobalTotals = createSelector(
  getGlobalState,
  (state) => state.globalTotals
);

export const useGlobalTotals = () => useSelector(storeGlobalTotals);
