import { configureStore } from '@reduxjs/toolkit';
import ediReducer from '../features/edi/ediSlice';

export const store = configureStore({
  reducer: {
    edi: ediReducer,
  },
});
