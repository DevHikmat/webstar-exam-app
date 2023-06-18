import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentUser: null,
  userList: null,
  viewUser: null,
  error: null,
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
    getOneUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
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
      state.currentUser = null;
      state.isChange = !state.isChange;
    },
    // LOGOUT USER
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});
export const {
  getAllUsersStart,
  getAllUsersSuccess,
  getOneUserStart,
  getOneUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
