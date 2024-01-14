import { configureStore } from '@reduxjs/toolkit';

import userReducer from './auth/authSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
  },
});
export default store;
