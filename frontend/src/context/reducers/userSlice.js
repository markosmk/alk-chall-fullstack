import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
  userData: {},
  isLoading: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setInfo } = userSlice.actions;
// export const getAllCategories = (state) => state.user.info;
export default userSlice.reducer;

export const getInfoUser = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth.user;

      const resp = await userService.getInfoUser(id);
      if (resp) {
        dispatch(setInfo(resp.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
