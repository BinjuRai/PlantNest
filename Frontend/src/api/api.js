// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api"; // fallback

// const instance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or however you store it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;