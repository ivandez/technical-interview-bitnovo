import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Device-Id": process.env.X_DEVICE_ID,
  },
});

export default axiosClient;
