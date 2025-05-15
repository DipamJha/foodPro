import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import scanReducer from './slices/scanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scan: scanReducer,
  },
});