import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  question: null,
  error: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
});
export const {} = questionSlice.actions;
export default questionSlice.reducer;
