import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const URL = "https://disease.sh/v3/covid-19/";
export const fetchGlobalData = createAsyncThunk(
  "global/fetchGlobalData",
  async (idleParam, { rejectWithValue }) => {
    try {
      const res = await fetch(URL + "all");
      const data = await res.json();
      if (res.status === 404) return rejectWithValue(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchGlobalData.fulfilled, (state, action) => {
      state.status = "resolved";
      state.globalTotals = action.payload;
    });
    builder.addCase(fetchGlobalData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
