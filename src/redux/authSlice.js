import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  userInfo: null,
  error: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUserStart: (state) => {
      state.isLoading = true;
    },
    authUserSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    authUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { authUserStart, authUserSuccess, authUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
