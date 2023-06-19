import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  quiz: null,
  error: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getQuizStart: (state) => {
      state.isLoading = true;
    },
    getQuizSuccess: (state, action) => {
      state.isLoading = false;
      state.quiz = action.payload;
    },
  },
});
export const { getQuizStart,getQuizSuccess } = quizSlice.actions;
export default quizSlice.reducer;
