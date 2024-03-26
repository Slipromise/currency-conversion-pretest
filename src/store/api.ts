import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PairsData } from "./types";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65efcc68ead08fa78a50f929.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    pairs: builder.query<PairsData[], unknown>({
      query: () => "pairs",
    }),
  }),
});

export default api;

export const { usePairsQuery } = api;
