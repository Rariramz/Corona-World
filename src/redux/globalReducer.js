import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  globalCases: 0,
  globalDeaths: 0,
  globalRecovered: 0,
};

export const setGlobalCases = createAction("SET_GLOBAL_CASES");
export const setGlobalDeaths = createAction("SET_GLOBAL_DEATHS");
export const setGlobalRecovered = createAction("SET_GLOBAL_RECOVERED");

export default createReducer(initialState, {
  [setGlobalCases]: (state, action) => {
    state.globalCases = action.globalCases;
  },
  [setGlobalDeaths]: (state, action) => {
    state.globalDeaths = action.globalDeaths;
  },
  [setGlobalRecovered]: (state, action) => {
    state.globalRecovered = action.globalRecovered;
  },
});
