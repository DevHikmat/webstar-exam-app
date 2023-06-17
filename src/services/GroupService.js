import { axiosInstance } from "./axiosInstance";

export const GroupService = {
  async getAllGroups() {
    const res = await axiosInstance.get(`/group`);
    return res.data;
  },
  async addGroup(group) {
    const res = await axiosInstance.post("/group", group);
    return res.data;
  },
  async updateGroup(id, group) {
    const res = await axiosInstance.patch(`/group/${id}`, group);
    return res.data;
  },
  async deleteGroupById(id) {
    const res = await axiosInstance.delete(`/group/${id}`);
    return res.data;
  },
};
