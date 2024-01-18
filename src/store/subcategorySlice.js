import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RestApi from 'src/api/RestApi';

// Async Thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Assuming user state has a 'token' field
      const response = await RestApi.get('/admin/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // Return custom error message from the API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for creating a subsubcategory
export const createsubcategory = createAsyncThunk(
  'categories/createsubcategory',
  async (subsubcategory, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.post('/admin/add-subcategory', subsubcategory, config);
      const data = await response.data?.response;
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

// Async Thunk for updating a subsubcategory
export const updatesubcategory = createAsyncThunk(
  'categories/updatesubcategory',
  async ({ id, subsubcategory }, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }; // Assuming user state has a 'token' field
      const response = await RestApi.put(`/admin/update-subcategory/${id}`, subsubcategory, config);
      const data = await response.data;
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

// Async Thunk for deleting a subsubcategory
export const deletesubcategory = createAsyncThunk(
  'categories/deletesubcategory',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.delete(`/admin/delete-subcategory/${id}`, config);
      const data = await response.json();
      return { id, data };
    } catch (error) {
      // Return custom error message from the API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const subsubcategorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: null,
    status: 'idle',
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
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

      // Create subsubcategory
      .addCase(createsubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createsubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.success = action.payload;
      })
      .addCase(createsubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update subsubcategory
      .addCase(updatesubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatesubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(
          (subsubcategory) => subsubcategory.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
          state.success = 'subcategory updated successfully';
        }
      })
      .addCase(updatesubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete subsubcategory
      .addCase(deletesubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletesubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        state.list = state.list.filter((subsubcategory) => subsubcategory.id !== id);
        state.success = 'subcategory deleted successfully';
      })
      .addCase(deletesubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = subsubcategorySlice.actions;

export default subsubcategorySlice.reducer;
