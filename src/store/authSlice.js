// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RestApi from '../api/RestApi';

// Async thunk for user login
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Make request to the backend
      const { data } = await RestApi.post('/auth/administrator/login/email', formData, config);

      // Store user's token in local storage
      sessionStorage.setItem('userInfo', JSON.stringify(data));

      return data;
    } catch (error) {
      // Return custom error message from the API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice with initial state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    userInfo: sessionStorage.getItem('userInfo')
      ? JSON.parse(sessionStorage.getItem('userInfo'))
      : null,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      sessionStorage.removeItem('userInfo'); // Deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // You can add more cases for other actions here...
  },
});

// Export actions
export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
