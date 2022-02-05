import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import categorySlice from './reducers/categorySlice';
import operationSlice from './reducers/operationSlice';
import userSlice from './reducers/userSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  category: categorySlice,
  operation: operationSlice,
  user: userSlice,
});

// const rootReducer = (state, action) => {
//   if (action.type === 'counter/logout') {
//     state = {};
//   }
//   return combinedReducer(state, action);
// };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categorySlice,
    operation: operationSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
