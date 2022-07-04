import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const globalSlice = createApi({
  reducerPath: "global",
  baseQuery: fetchBaseQuery({ baseUrl: "https://disease.sh/v3/covid-19/" }),
  endpoints: (build) => ({
    getGlobalData: build.query({
      query: () => ({ url: `all` }),
    }),
  }),
});

export default globalSlice;

export const { useGetGlobalDataQuery } = globalSlice;
