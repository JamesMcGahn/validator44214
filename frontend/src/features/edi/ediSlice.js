import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ediService from './ediService';

const initialState = {
  ediPayload: [],
  isError: false,
  isLoading: false,
};

export const read = createAsyncThunk('edi/read', async (file, thunkAPI) => {
  try {
    return await ediService.readFile(file);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ediSlice = createSlice({
  name: 'edi',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(read.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(read.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ediPayload = action.payload;
      })
      .addCase(read.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ediSlice.actions;
export default ediSlice.reducer;
