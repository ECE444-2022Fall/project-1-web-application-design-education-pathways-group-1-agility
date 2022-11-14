import axios from "axios";

const myInstance = axios.create({
  baseURL: "https://agility-education-pathways.herokuapp.com",
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
