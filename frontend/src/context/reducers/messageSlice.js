import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
      // return { message: action.payload };
    },
    clearMessage: (state) => {
      state.message = '';
      // return { message: '' };
    },
  },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
