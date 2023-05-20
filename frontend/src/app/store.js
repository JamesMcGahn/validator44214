import { configureStore } from '@reduxjs/toolkit';
import ediReducer from '../features/edi/ediSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    edi: ediReducer,
    auth: authReducer,
  },
});
