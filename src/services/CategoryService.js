import { axiosInstance } from "./axiosInstance";

export const CategoryService = {
  async getAllCategory() {
    const res = await axiosInstance.get("/category");
    return res.data;
  },
  async createCategory(formData) {
    const res = await axiosInstance.post("/category", formData);
    return res.data;
  },
};
