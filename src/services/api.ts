import axios from 'axios';

// Prioridade: Variável de ambiente -> URL oficial do Render -> Localhost
const API_URL = import.meta.env.VITE_API_URL || 'https://document-api-backend-v2.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para colocar o Token em todas as chamadas automaticamente
api.interceptors.request.use((config) => {
  // Usando a mesma chave que definimos nos outros módulos
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;