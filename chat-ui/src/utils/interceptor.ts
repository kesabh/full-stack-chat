import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";

const axiosInstace = axios.create();

export const useAxiosInterceptor = () => {
  useEffect(() => {
    axiosInstace.interceptors.request.use(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig => {
        const token = localStorage.getItem("authToken") || "";
        if (token && config) {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      }
    );

    axiosInstace.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<never> => Promise.reject(error.response)
    );
  }, []);
};

export default axiosInstace;
