import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice.js";
import continentSlice from "./continent/continentSlice.js";
import countrySlice from "./country/countrySlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  global: globalSlice,
  continent: continentSlice,
  country: countrySlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
