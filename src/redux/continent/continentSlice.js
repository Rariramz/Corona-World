import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const continentSlice = createApi({
  reducerPath: "continent",
  baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
  endpoints: (build) => ({
    getContinentData: build.query({
      query: (name) => ({ url: `continents/${name}` }),
    }),
  }),
});

export default continentSlice;

export const { useGetContinentDataQuery } = continentSlice;
