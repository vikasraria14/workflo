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
      const userToken = parsedUserObj?.tokens.access.token;
      // config.headers.Authorization = `Bearer ${userToken}`;
      config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTg5M2RjMGJjOGU5MjZjZDkyMWY5NSIsImlhdCI6MTcyMjMzMDAyNH0.hQD-hU7jR40Qnj1cXgVzHnakhYoUOTctCSOL1ti8FGE'  
    }else{
      config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTg5M2RjMGJjOGU5MjZjZDkyMWY5NSIsImlhdCI6MTcyMjMzMDAyNH0.hQD-hU7jR40Qnj1cXgVzHnakhYoUOTctCSOL1ti8FGE'   }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
