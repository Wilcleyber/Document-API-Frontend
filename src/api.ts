import axios from "axios";
import { API_BASE_URL, TOKEN_KEY } from "./app/config";

// Instância global do Axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para incluir token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
