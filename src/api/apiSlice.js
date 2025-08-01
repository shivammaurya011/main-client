import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config/env';

// Enhanced fetch with retry logic
const customFetchWithRetry = async (...args) => {
  const maxRetries = 2;
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(...args);
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw lastError;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
    credentials: 'include',
    fetchFn: customFetchWithRetry,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ['User', 'News'],
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    sendOTPEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/send-otp-email',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOTPEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-otp-email',
        method: 'POST',
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ idToken }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { idToken },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    verify: builder.query({
      query: () => '/auth/verify',
      providesTags: ['User'],
      keepUnusedDataFor: 600,
      transformErrorResponse: (res) => {
        if (res.status === 401 || res.status === 403) {
          return { message: 'Session expired or unauthorized' };
        }
        return res;
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),

    // User profile
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
      keepUnusedDataFor: 600,
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),

    // News CRUD
    getNews: builder.query({
      query: () => '/news',
      providesTags: ['News'],
    }),
    createNews: builder.mutation({
      query: (data) => ({
        url: '/news',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),
    updateNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/news/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

// Auto-generated hooks
export const {
  useRegisterMutation,
  useSendOTPEmailMutation,
  useVerifyOTPEmailMutation,
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = apiSlice;

export default apiSlice;
