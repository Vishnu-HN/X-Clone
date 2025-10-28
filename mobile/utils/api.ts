
import axios, { AxiosInstance } from "axios";
import {useAuth} from "@clerk/clerk-expo";

const API_BASE_URL = "https://x-clone-pied.vercel.app/api";

export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    console.log('Making request to:', config.url);
    const token = await getToken();
    console.log('Token available:', !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log('API Success:', response.status);
      return response;
    },
    (error) => {
      console.log('API Error:', error.message);
      console.log('Error details:', error.response?.data);
      return Promise.reject(error);
    }
  );

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
};

