import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";

import { ResponseBase } from "./types/common";

type CoreApiConfig = {
  baseUrl: string;
  tokenProvider?: () => Promise<string | null>;
};

const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
} as const;

let axiosInstance: AxiosInstance | null = null;
let publicAxiosInstance: AxiosInstance | null = null;

export const initCoreApi = ({ baseUrl, tokenProvider }: CoreApiConfig) => {
  const commonConfig = {
    baseURL: baseUrl,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  };

  axiosInstance = axios.create(commonConfig);
  publicAxiosInstance = axios.create(commonConfig);

  axiosInstance.interceptors.request.use(async (config) => {
    const token = tokenProvider ? await tokenProvider() : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ResponseBase<unknown>>) => {
      const data = response.data;
      // eslint-disable-next-line no-magic-numbers
      if (data.status >= 200 && data.status < 300 && data.success) return response;

      return Promise.reject(
        new AxiosError(
          data.msg,
          data.status.toString(),
          response.config,
          response.request,
          response,
        ),
      );
    },
    (error: AxiosError) => Promise.reject(error),
  );
  publicAxiosInstance.interceptors.response.use(
    (response: AxiosResponse<ResponseBase<unknown>>) => {
      const data = response.data;
      // eslint-disable-next-line no-magic-numbers
      if (data.status >= 200 && data.status < 300 && data.success) return response;

      return Promise.reject(
        new AxiosError(
          data.msg,
          data.status.toString(),
          response.config,
          response.request,
          response,
        ),
      );
    },
    (error: AxiosError) => Promise.reject(error),
  );
};

const checkInstance = (type: "public" | "protected") => {
  if ((type === "public" && !publicAxiosInstance) || (type === "protected" && !axiosInstance))
    throw new Error("Axios instance not initialized. Call initCoreApi first.");
};

const createApiMethod =
  (methodType: Method) =>
  <T>(config: AxiosRequestConfig, type: "public" | "protected" = "protected"): Promise<T> => {
    checkInstance(type);

    if (type === "protected")
      return axiosInstance!({
        ...config,
        method: methodType,
      }).then((response: AxiosResponse<T>) => response.data);
    else
      return publicAxiosInstance!({
        ...config,
        method: methodType,
      }).then((response: AxiosResponse<T>) => response.data);
  };

const http = {
  get: createApiMethod(HTTP_METHODS.GET),
  post: createApiMethod(HTTP_METHODS.POST),
  patch: createApiMethod(HTTP_METHODS.PATCH),
  put: createApiMethod(HTTP_METHODS.PUT),
  delete: createApiMethod(HTTP_METHODS.DELETE),
};

export default http;
