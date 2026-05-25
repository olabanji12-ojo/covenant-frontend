import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import apiClient from '../api/client';
import type { User, Match, Prayer } from '../types';

// Create a custom baseQuery that uses our highly configured Axios client under the hood
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params });
      return { data: result.data.data }; // Unwrap the standard ApiResponse wrapper
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  // Tags are used for automated refetching. 
  // e.g. Posting a prayer invalidates 'Prayer', causing the prayer list to automatically refresh!
  tagTypes: ['Prayer', 'Discover', 'Match'],
  endpoints: (builder) => ({
    // DISCOVER FEED
    getDiscoveryFeed: builder.query<User[], void>({
      query: () => ({ url: '/discover', method: 'GET' }),
      providesTags: ['Discover'],
    }),

    // MATCHES & MESSAGES
    getMatches: builder.query<User[], void>({
      query: () => ({ url: '/matches', method: 'GET' }),
      providesTags: ['Match'],
    }),

    // PRAYER WALL
    getPrayers: builder.query<Prayer[], void>({
      query: () => ({ url: '/prayers', method: 'GET' }),
      providesTags: ['Prayer'],
    }),
    postPrayer: builder.mutation<Prayer, { content: string }>({
      query: (data) => ({ url: '/prayers', method: 'POST', data }),
      invalidatesTags: ['Prayer'], // Force refresh of the prayer list after posting
    }),
    postAmen: builder.mutation<void, string>({
      query: (prayerId) => ({ url: `/prayers/${prayerId}/amen`, method: 'POST' }),
      invalidatesTags: ['Prayer'], // Force refresh to show updated Amen count
    }),
  }),
});

// Export the generated React hooks for each endpoint
export const {
  useGetDiscoveryFeedQuery,
  useGetMatchesQuery,
  useGetPrayersQuery,
  usePostPrayerMutation,
  usePostAmenMutation,
} = apiSlice;
