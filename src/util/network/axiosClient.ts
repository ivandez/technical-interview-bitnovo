import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Device-Id": process.env.NEXT_PUBLIC_X_DEVICE_ID,
  },
});

export default axiosClient;
