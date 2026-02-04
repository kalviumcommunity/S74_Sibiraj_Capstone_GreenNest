import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
};

export const userApi = {
  getPoints: () => api.get('/user/points'),
  addPoints: (points) => api.post('/user/add-points', { points }),
};

export const seedsApi = {
  getAll: () => api.get('/seeds'),
  add: (seed) => api.post('/seeds', seed),
};

export const chatbotApi = {
  suggestFertilizer: (seedName) => api.post('/chatbot', { seedName }),
};

export default api;
