import { baseApi } from "../../api/baseApi";

const urlApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMyUrls: builder.query({
      query: () => ({
        url: "/urls/my-urls",
        method: "GET",
      }),

    }),

    createShortUrl: builder.mutation({
      query: (body) => ({
        url: "/urls/shorten",
        method: "POST",
        body,
      }),
    
    }),
    deleteUrl: builder.mutation({
      query: (id: string) => ({
        url: `/urls/${id}`,
        method: "DELETE",
      }),
    
    }),

    getRedirectUrl: builder.query({
      query: (shortCode: string) => ({
        url: `/urls/${shortCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMyUrlsQuery,
  useCreateShortUrlMutation,
  useDeleteUrlMutation,
  useGetRedirectUrlQuery,
} = urlApi;

export default urlApi;
