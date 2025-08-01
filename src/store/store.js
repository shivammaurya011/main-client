import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import config from '../config/env';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: config.nodeEnv === 'local',
});