import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coronavirusApi = createApi({
  reducerPath: "coronavirusApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
  endpoints: (builder) => ({
    getGlobalData: {
      query: (name) => `continents/${name}`,
    },
    getContinentData: {
      query: (name) => `continents/${name}`,
    },
    getCountryData: {
      query: (name) => `countries/${name}`,
    },
  }),
});

export const {
  useGetGlobalDataQuery,
  useGetContinentDataQuery,
  useGetCountryDataQuery,
} = coronavirusApi;
