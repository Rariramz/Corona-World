import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const userSelected = createSlice({
  name: "userSelected",
  initialState,
  reducers: {
    setContinentName: (state, action) => {
      state.continentName = action.payload;
    },
    setCountryName: (state, action) => {
      state.countryName = action.payload;
    },
  },
});

export const { setContinentName, setCountryName } = userSelected.actions;
export default userSelected;
