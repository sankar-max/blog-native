import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || (__DEV__ ? 'http://[IP_ADDRESS]' : '');

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request (Cookie-based)
api.interceptors.request.use(async (config) => {
  // Key format: {storagePrefix}.better-auth.session_token
  // If storagePrefix is not set, it's just better-auth.session_token
  // In lib/auth-client.ts, storagePrefix: 'myapp' => 'myapp.better-auth.session_token'
  const token = await SecureStore.getItemAsync('myapp.better-auth.session_token');

  if (token) {
    config.headers.Cookie = `better-auth.session_token=${token}`;
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
        // Unauthorized → clear token & handle logout
        // The better-auth client will likely handle this if you use its hooks,
        // but for manual requests, we clear the storage.
        await SecureStore.deleteItemAsync('myapp.better-auth.session_token');
        // Optionally redirect or emit an event here
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
