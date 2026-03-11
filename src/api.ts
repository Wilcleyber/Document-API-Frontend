import axios from "axios";
import { API_BASE_URL, TOKEN_KEY } from "./app/config";

// Instância global do Axios
export const api = axios.create({
  // Tenta a variável da Vercel, se não achar, usa o seu backend do Render
  baseURL: import.meta.env.VITE_API_URL || "https://document-api-backend-v2.onrender.com",
});

// Interceptor para incluir token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
