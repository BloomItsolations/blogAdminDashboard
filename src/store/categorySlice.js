import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RestApi from 'src/api/RestApi';

// Async Thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState }) => {
    try {
      const { token } = getState().user; // Assuming user state has a 'token' field
      const response = await RestApi.get('/admin/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Async Thunk for creating a category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category, { getState }) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.post('/admin/add-category', category, config);
      const data = await response.data?.response;
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Async Thunk for updating a category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, category }, { getState }) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }; // Assuming user state has a 'token' field
      const response = await RestApi.put(`/admin/update-category/${id}`, category, config);
      const data = await response.data;
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Async Thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { getState }) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.delete(`/admin/delete-category/${id}`, config);
      const data = await response.json();
      return { id, data };
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.list = state.list.filter((category) => category.id !== id);
      });
  },
});

export default categorySlice.reducer;
