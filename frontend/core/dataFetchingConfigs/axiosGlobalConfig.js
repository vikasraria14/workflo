import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    let userId = Cookies.get("user");
    if (userId) {
      const parsedUserObj = JSON.parse(userId);
      const userToken = parsedUserObj?.token;
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
