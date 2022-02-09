import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';

import { logout } from './authSlice';

const initialState = {
  list: [],
  isLoading: null,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      return initialState;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const getAllCategories = (state) => state.category.categories;
export default categorySlice.reducer;

export const getCategories = (query) => {
  return async (dispatch) => {
    try {
      const resp = await categoryService.getAllCategories(query);
      if (resp) {
        dispatch(setCategories(resp.data.categories));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
