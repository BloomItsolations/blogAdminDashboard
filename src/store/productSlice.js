import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RestApi from 'src/api/RestApi';

// Async Thunk for fetching product
export const fetchproduct = createAsyncThunk(
  'product/fetchproduct',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Assuming user state has a 'token' field
      const response = await RestApi.get('/admin/product', {
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

// Async Thunk for creating a product
export const createproduct = createAsyncThunk(
  'product/createproduct',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.post('/admin/add-product', product, config);
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

// Async Thunk for updating a product
export const updateproduct = createAsyncThunk(
  'product/updateproduct',
  async ({ id, product }, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }; // Assuming user state has a 'token' field
      const response = await RestApi.put(`/admin/update-product/${id}`, product, config);
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

// Async Thunk for deleting a product
export const deleteproduct = createAsyncThunk(
  'product/deleteproduct',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await RestApi.delete(`/admin/delete-product/${id}`, config);
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

const productSlice = createSlice({
  name: 'product',
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
      // Fetch product
      .addCase(fetchproduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchproduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create product
      .addCase(createproduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createproduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.success = action.payload;
      })
      .addCase(createproduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update product
      .addCase(updateproduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          state.success = 'product updated successfully';
        }
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteproduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        state.list = state.list.filter((product) => product.id !== id);
        state.success = 'product deleted successfully';
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = productSlice.actions;

export default productSlice.reducer;
