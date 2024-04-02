import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';
const instance = axios.create({
  baseURL: "https://9bce1e67bb32-2980149167387609208.ngrok-free.app",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
