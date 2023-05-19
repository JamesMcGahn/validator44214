import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/edi/ediSlice';

export const store = configureStore({
  reducer: {
    edi: authReducer,
  },
});
