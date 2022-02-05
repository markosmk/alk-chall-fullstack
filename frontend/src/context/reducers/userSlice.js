import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

import { logout } from './authSlice';

const initialState = {
  userData: {},
  isLoading: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.userData = {};
      state.isLoading = true;
      state.error = null;
    },
    setInfo: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setErrors: (state, action) => {
      state.userData = {};
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      return initialState;
    },
  },
});

export const { setInfo, setLoading, setErrors } = userSlice.actions;
// export const getAllCategories = (state) => state.user.info;
export default userSlice.reducer;

export const getInfoUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { id } = getState().auth.user;
      const resp = await userService.getInfoUser(id);

      setTimeout(() => {
        if (resp) {
          dispatch(setInfo(resp.data.user));
        }
      }, 1500);
    } catch (error) {
      console.log(error.response.data);
      dispatch(setErrors(error.response.data.message));
    }
  };
};
