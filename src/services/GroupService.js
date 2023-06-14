import { axiosInstance } from "./axiosInstance";

export const GroupService = {
  async getAllGroups() {
    const res = await axiosInstance.get(`/group`);
    return res.data;
  },
  async addGroup(token, group) {
    const res = await axiosInstance.post("/group", group, {
      headers: {
        Authorization: "Baerer " + token,
      },
    });
    return res.data;
  },
  async updateGroup(token, id, group) {
    const res = await axiosInstance.patch(`/group/${id}`, group, {
      headers: {
        Authorization: "Baerer " + token,
      },
    });
    return res.data;
  },
  async deleteGroup(token, id) {
    const res = await axiosInstance.delete(`/group/${id}`, {
      headers: {
        Authorization: "Baerer " + token,
      },
    });
    return res.data;
  },
};
