import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ediService from './ediService';

const initialState = {
  ediPayload: null,
  validatePayload: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
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

export const validate = createAsyncThunk(
  'edi/validate',
  async (file, thunkAPI) => {
    try {
      return await ediService.validateEdi(file);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const ediSlice = createSlice({
  name: 'edi',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = false;
    },
    resetAll: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(read.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(read.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ediPayload = action.payload;
        state.isSuccess = true;
      })
      .addCase(read.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(validate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.validatePayload = action.payload;
        state.isSuccess = true;
      })
      .addCase(validate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll } = ediSlice.actions;
export default ediSlice.reducer;
