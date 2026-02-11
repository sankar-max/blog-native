import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || (__DEV__ ? 'http://192.168.1.12:3000' : '');

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses & errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // If your API returns { status: "success", data: ... } → unwrap data
    if (response.data?.status === 'success') {
      return response.data.data;
    }
    return response.data;
  },
  async (error: AxiosError<any>) => {
    const { response } = error;

    let message = 'Something went wrong';

    if (response) {
      message = response.data?.message || `Error ${response.status}`;

      if (response.status === 401) {
        // Unauthorized → clear token & redirect to login
        await SecureStore.deleteItemAsync('auth_token');
        // Use router or global event to redirect
        // For now: Alert.alert('Session expired', 'Please log in again');
      }
    } else {
      message = 'No internet connection or server unreachable.';
    }

    // Optional: show toast / alert here
    // Alert.alert('Error', message);

    return Promise.reject({ message, status: response?.status });
  }
);

export default api;
