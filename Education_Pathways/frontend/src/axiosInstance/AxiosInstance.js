import axios from "axios";

const myInstance = axios.create({
  baseURL: "http://localhost:3000",
});

myInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myInstance;
