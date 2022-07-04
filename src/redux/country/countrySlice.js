import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countrySlice = createApi({
  reducerPath: "country",
  baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
  endpoints: (build) => ({
    getCountryData: build.query({
      query: (name) => ({ url: `countries/${name}` }),
    }),
  }),
});

export default countrySlice;

export const { useGetCountryDataQuery } = countrySlice;
