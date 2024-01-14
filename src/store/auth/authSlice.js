import { createSlice } from '@reduxjs/toolkit';

import { userLogin } from './authActions';

const initialState = {
  loading: false,
  userInfo: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('userInfo'); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
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
// export actions
export const { logout } = userSlice.actions;
export default userSlice.reducer;
