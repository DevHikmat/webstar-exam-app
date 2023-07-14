import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userList: null,
  isChange: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // GET ALL USERS
    getAllUsersStart: (state) => {
      state.isLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    },
    // VIEW ONE USER
    getOneUserStart: (state) => {
      state.isLoading = true;
    },
    getOneUserSuccess: (state) => {
      state.isLoading = false;
    },
    getOneUserFailure: (state) => {
      state.isLoading = false;
    },
    // UPDATE USER
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //DELETE USER
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
  },
});
export const {
  getAllUsersStart,
  getAllUsersSuccess,
  getOneUserStart,
  getOneUserSuccess,
  getOneUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
