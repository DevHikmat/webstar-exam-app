import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://quizzapp-server-production.up.railway.app/api",
});
