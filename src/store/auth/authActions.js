import { createAsyncThunk } from '@reduxjs/toolkit';

import RestApi from '../../api/RestApi';

export const userLogin = createAsyncThunk('userLogin', async (formData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // make request to backend
    const { data } = await RestApi.post('/auth/user/login/email', formData, config);
    // store user's token in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data?.user;
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
