import axios from 'axios';

// Aqui está a mágica: se estiver rodando local, usa localhost. 
// Se estiver no ar, usa a URL do seu Render.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para colocar o Token em todas as chamadas automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;