import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  category: null,
  error: null,
  isChange: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategoryStart: (state) => {
      state.isLoading = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    },
    createCategoryStart: (state) => {
      state.isLoading = true;
    },
    createCategorySuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
  },
});
export const {
  getAllCategoryStart,
  getAllCategorySuccess,
  createCategoryStart,
  createCategorySuccess,
} = categorySlice.actions;
export default categorySlice.reducer;
