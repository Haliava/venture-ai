import axios from "axios";
import { BASE_API_URL } from "../constants/api";

export const axiosInstance = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Или из store (Vuex/Redux)
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});
