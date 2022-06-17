import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice.js";
import continentSlice from "./continent/continentSlice.js";
import countrySlice from "./country/countrySlice.js";

const rootReducer = combineReducers({
  global: globalSlice,
  continent: continentSlice,
  country: countrySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
