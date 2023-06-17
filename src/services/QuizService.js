import { axiosInstance } from "./axiosInstance";

export const QuizService = {
  async getAllQuiz() {
    const res = await axiosInstance.get("/quiz");
    return res.data;
  },
};
