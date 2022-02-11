import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import categorySlice from './reducers/categorySlice';
import messageSlice from './reducers/messageSlice';
import modalSlice from './reducers/modalSlice';
import operationSlice from './reducers/operationSlice';
import userSlice from './reducers/userSlice';

// const combinedReducer = combineReducers({
//   auth: authReducer,
//   category: categorySlice,
//   operation: operationSlice,
//   user: userSlice,
// });

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
    message: messageSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
