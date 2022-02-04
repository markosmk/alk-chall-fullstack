import { createSlice } from '@reduxjs/toolkit';
import operationService from '../services/operationService';

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
});

export const { setOperations, setLoading, setErrors } = operationSlice.actions;

export default operationSlice.reducer;

export const getOperations = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const resp = await operationService.getAllOperations();

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
