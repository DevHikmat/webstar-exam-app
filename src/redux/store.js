import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import quiz from "./quizSlice";
import question from "./questionSlice";

export const store = configureStore({
  reducer: {
    user,
    quiz,
    question,
  },
});
