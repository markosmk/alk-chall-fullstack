import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const initialState = {
  data: {},
  isOpen: false,
  isLoading: null,
  error: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setDataModal: (state, action) => {
      state.data = action.payload;
      state.isOpen = true;
    },
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      return initialState;
    },
  },
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      return initialState;
    },
  },
});

export const { setDataModal, openModal, closeModal } = modalSlice.actions;
export const getIdModalData = (state) => state.modal?.id;
export default modalSlice.reducer;

// export const getCategories = (query) => {
//   return async (dispatch) => {
//     try {
//       const resp = await categoryService.getAllCategories(query);
//       if (resp) {
//         dispatch(setCategories(resp.data.categories));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
