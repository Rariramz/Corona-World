import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const URL = "https://disease.sh/v3/covid-19/";
export const fetchCountryData = createAsyncThunk(
  "country/fetchCountryData",
  async (countryName, { rejectWithValue }) => {
    try {
      const res = await fetch(URL + `countries/${countryName}`);
      const data = await res.json();
      if (res.status === 404) return rejectWithValue(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setReduxCountryName(state, action) {
      state.countryName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountryData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCountryData.fulfilled, (state, action) => {
      state.status = "resolved";
      state.countryTotals = action.payload;
    });
    builder.addCase(fetchCountryData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.countryTotals = null;
    });
  },
});

export const { setReduxCountryName } = countrySlice.actions;
export default countrySlice.reducer;
