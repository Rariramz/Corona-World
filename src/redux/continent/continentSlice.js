import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const URL = "https://disease.sh/v3/covid-19/";
export const fetchContinentData = createAsyncThunk(
  "continent/fetchContinentData",
  async function (continentName, { rejectWithValue }) {
    try {
      const res = await fetch(URL + `continents/${continentName}`);
      const data = await res.json();
      if (res.status === 404) return rejectWithValue(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const continentSlice = createSlice({
  name: "continent",
  initialState,
  reducers: {
    setReduxContinentName(state, action) {
      state.continentName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContinentData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchContinentData.fulfilled, (state, action) => {
      state.status = "resolved";
      state.continentTotals = action.payload;
    });
    builder.addCase(fetchContinentData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { setReduxContinentName } = continentSlice.actions;
export default continentSlice.reducer;
