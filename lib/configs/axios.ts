import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import routes from "./routes";

const AxiosInstance = axios.create({
  baseURL: "https://mbl-test-api.onrender.com/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const unauthorizedCode = [401, 403];
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ3MTQ0ZWI2YTliNGJiMWEwNjMxMTYiLCJpYXQiOjE3MTU5MzQ0NTcsImV4cCI6MTcyMzcxMDQ1N30.uYv17H_rC8K7l4NLuSZD757FcA7Gg1SQNsG0wN2Qkls";

// Add an interceptor to set the Authorization header dynamically
AxiosInstance.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    const { response } = error;
    console.log(error);

    if (response && unauthorizedCode.includes(response?.status)) {
      router.push("/");
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
