import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countryReducer";
import globalReducer from "./globalReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  country: countryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
