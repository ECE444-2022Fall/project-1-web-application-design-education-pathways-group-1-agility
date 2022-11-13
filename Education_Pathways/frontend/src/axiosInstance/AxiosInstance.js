import axios from "axios";

const myInstance = axios.create({
  baseURL: "http://localhost:3000",
});

myInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default myInstance;
