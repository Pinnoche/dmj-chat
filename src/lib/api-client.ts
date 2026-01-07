import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AUTH_ENDPOINTS } from "./contants";

const baseUrl = "http://localhost:4000";

export const apiClient = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Helper to check if the request is for an auth endpoint
const isAuthRequest = (url?: string): boolean =>
  url ? AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint)) : false;

apiClient.interceptors.request.use(
  (config) => attachAuthToken(config),
  (error) => Promise.reject(error)
);

const isBrowser = typeof window !== "undefined";

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log("Interceptor caught error", error);

    console.log(originalRequest?.url);
    if (originalRequest?.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }
    console.log(error);
    return error.response?.status === 401 &&
      !originalRequest._retry &&
      isBrowser
      ? handle401Error(originalRequest)
      : Promise.reject(error);
  }
);

let refreshPromise: Promise<any> | null = null;

const clearRefreshPromise = (): void => {
  refreshPromise = null;
};
const handle401Error = async (
  originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }
) => {
  originalRequest._retry = true;
  console.log("Promises....");
  if (!refreshPromise) {
    refreshPromise = apiClient.post(`/auth/refresh-token`);
  }

  try {
    console.log("hfdsfjsfsjh");
    const res = await refreshPromise;
    clearRefreshPromise();
    const newToken = res.data.token;
    if (!newToken) throw new Error("No accessToken in refresh response");
    if (isBrowser) {
      localStorage.setItem("token", newToken);
    }
    if (originalRequest.headers) {
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
    }
    return apiClient(originalRequest);
  } catch (err) {
    clearRefreshPromise();
    if (isBrowser) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
};

const attachAuthToken = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  if (!isAuthRequest(config.url)) {
    const token = isBrowser ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
};
