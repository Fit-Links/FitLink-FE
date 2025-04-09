import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from "axios";

type CoreApiConfig = {
  baseUrl: string;
  tokenProvider?: () => string | null;
};

const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
} as const;

let axiosInstance: AxiosInstance | null = null;

export const initCoreApi = ({ baseUrl, tokenProvider }: CoreApiConfig) => {
  axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = tokenProvider ? tokenProvider() : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => Promise.reject(error),
  );
};

const checkInstance = () => {
  if (!axiosInstance) {
    throw new Error("Axios instance not initialized. Call initCoreApi first.");
  }
};

const createApiMethod =
  (methodType: Method) =>
  <T>(config: AxiosRequestConfig): Promise<T> => {
    checkInstance();

    return axiosInstance!({
      ...config,
      method: methodType,
    });
  };

const http = {
  get: createApiMethod(HTTP_METHODS.GET),
  post: createApiMethod(HTTP_METHODS.POST),
  patch: createApiMethod(HTTP_METHODS.PATCH),
  put: createApiMethod(HTTP_METHODS.PUT),
  delete: createApiMethod(HTTP_METHODS.DELETE),
};

export default http;
