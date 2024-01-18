import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import subcategoryReducer from './subcategorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
  },
});
export default store;
