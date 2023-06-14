import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  quiz: null,
  error: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});
export const {} = quizSlice.actions;
export default quizSlice.reducer;
