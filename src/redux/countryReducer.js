import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  countryName: "",
  population: 0,
  cases: 0,
  deaths: 0,
  recovered: 0,
  active: 0,
};

export const setCountryName = createAction("SET_COUNTRY");
export const setPopulation = createAction("SET_POPULATION");
export const setCases = createAction("SET_CASES");
export const setDeaths = createAction("SET_DEATHS");
export const setRecovered = createAction("SET_RECOVERED");
export const setActive = createAction("SET_ACTIVE");

export default createReducer(initialState, {
  [setCountryName]: (state, action) => {
    console.log(action.payload);
    state.countryName = action.payload;
  },
  [setPopulation]: (state, action) => {
    state.population = action.population;
  },
  [setCases]: (state, action) => {
    state.cases = action.cases;
  },
  [setDeaths]: (state, action) => {
    state.deaths = action.deaths;
  },
  [setRecovered]: (state, action) => {
    state.recovered = action.recovered;
  },
  [setActive]: (state, action) => {
    state.active = action.active;
  },
});
