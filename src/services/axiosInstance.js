import axios from "axios";

let token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: "https://quizzapp-server-production.up.railway.app/api",
  headers: {
    Authorization: "Baerer " + token,
  },
});
