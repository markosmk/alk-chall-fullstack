import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';

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
});

export const { setCategories } = categorySlice.actions;
export const getAllCategories = (state) => state.category.categories;
export default categorySlice.reducer;

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const resp = await categoryService.getAllCategories();
      if (resp) {
        dispatch(setCategories(resp.data.categories));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
