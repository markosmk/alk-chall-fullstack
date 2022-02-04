import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import categorySlice from './reducers/categorySlice';
import operationSlice from './reducers/operationSlice';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categorySlice,
    operation: operationSlice,
    user: userSlice,
  },
  devTools: true,
});
