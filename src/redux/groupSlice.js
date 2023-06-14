import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  groups: null,
  error: null,
  isChange: false,
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroupsStart: (state) => {
      state.isLoading = true;
    },
    getGroupsSuccess: (state, action) => {
      state.isLoading = false;
      state.groups = action.payload;
      state.error = null;
    },
    getGroupsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addGroupStart: (state) => {
      state.isLoading = true;
    },
    addGroupSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    updateGroupStart: (state) => {
      state.isLoading = true;
    },
    updateGroupSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    deleteGroup: (state) => {
      state.isChange = !state.isChange;
    },
  },
});
export const {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
  addGroupStart,
  addGroupSuccess,
  updateGroupStart,
  updateGroupSuccess,
  deleteGroup,
} = groupSlice.actions;
export default groupSlice.reducer;
