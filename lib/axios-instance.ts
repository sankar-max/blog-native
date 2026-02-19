import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: __DEV__ ? `${process.env.EXPO_PUBLIC_API_URL}/api` : 'https://your-vercel-app.com',
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('bearer_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      SecureStore.deleteItemAsync('auth_token');
      // Redirect to login (use global event or context)
    }
    return Promise.reject(err.response?.data || err.message);
  }
);

export default api;
