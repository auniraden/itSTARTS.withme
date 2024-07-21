import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-laravel-api-url',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default api;
