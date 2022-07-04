import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice.js";
import continentSlice from "./continent/continentSlice.js";
import countrySlice from "./country/countrySlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSelectedSlice from "./userSelected/userSelectedSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [globalSlice.reducerPath]: globalSlice.reducer,
  [continentSlice.reducerPath]: continentSlice.reducer,
  [countrySlice.reducerPath]: countrySlice.reducer,
  [userSelectedSlice.name]: userSelectedSlice.reducer,
});

const persistConfig = {
  key: "root",
  blacklist: ["global", "continent", "country"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      globalSlice.middleware,
      continentSlice.middleware,
      countrySlice.middleware
    ),
});
// setupListeners(store.dispatch);

export const persistor = persistStore(store);
