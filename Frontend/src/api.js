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
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const userApi = {
  getPoints: () => api.get('/user/points'),
  addPoints: (points) => api.post('/user/add-points', { points }),
};

export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
};

export const seedsApi = {
  getAll: () => api.get('/seeds'),
};

export const ordersApi = {
  create: (products) => api.post('/orders', { products }),
  getMy: () => api.get('/orders'),
};

export const trackerApi = {
  addPlant: (seedId) => api.post('/tracker', { seedId }),
  getMyPlants: () => api.get('/tracker'),
  updatePlant: (id, data) => api.patch(`/tracker/${id}`, data),
};

export const rewardsApi = {
  getAll: () => api.get('/rewards'),
};

export const seedExchangeApi = {
  getAll: () => api.get('/seed-exchange'),
  post: (data) => api.post('/seed-exchange', data),
  request: (id) => api.post(`/seed-exchange/${id}/request`),
};

export const chatbotApi = {
  chat: (seedName, message) => api.post('/chatbot', { seedName, message }),
  suggestFertilizer: (seedName) => api.post('/chatbot', { seedName }),
};

export const servicesApi = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
};

export const bookingsApi = {
  create: (data) => api.post('/bookings', data),
  getMy: () => api.get('/bookings/my'),
};

export const adminApi = {
  getAnalytics: () => api.get('/admin/analytics'),
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  addProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.patch(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getOrders: () => api.get('/admin/orders'),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}`, { status }),
  addReward: (data) => api.post('/admin/rewards', data),
  deleteReward: (id) => api.delete(`/admin/rewards/${id}`),
  getServices: () => api.get('/services'),
  addService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  getBookings: () => api.get('/bookings'),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}`, { status }),
};

export default api;
