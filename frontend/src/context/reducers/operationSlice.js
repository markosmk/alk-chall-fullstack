import { createSlice } from '@reduxjs/toolkit';
import operationService from '../services/operationService';

import { logout } from './authSlice';

const initialState = {
  list: [],
  isLoading: true,
  error: null,
};

const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.list = [];
      state.isLoading = true;
      state.error = null;
    },
    setOperations: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setErrors: (state, action) => {
      state.list = [];
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

export const { setOperations, setLoading, setErrors } = operationSlice.actions;

export default operationSlice.reducer;

export const getOperations = (query) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const resp = await operationService.getAllOperations(query);

      setTimeout(() => {
        if (resp) {
          dispatch(setOperations(resp.data.operations));
        }
      }, 1500);
    } catch (error) {
      console.log(error.response.data);
      dispatch(setErrors(error.response.data.message));
    }
  };
};
