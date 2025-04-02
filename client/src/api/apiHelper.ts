import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import config from "../config/config";
import { getLocalStrorageItem } from "../utils/utils";

export interface RequestData<T = any> {
  params?: Record<string, any>;
  data?: T | Record<string, any> | any;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  status: number;
  success: boolean;
  data: T;
  message: string;
}

export default class API {
  private baseUrl =
    import.meta.env.NODE_ENV === "production"
      ? config.PRODUCTION_API_PATH
      : config.LOCAL_API_PATH;

  private isLoggedIn: boolean = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root") ?? "{}")?.auth ?? "{}"
  ).isLogin;

  public async api<T>(
    method: Method,
    url: string,
    data?: RequestData
  ): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url: `${this.baseUrl}${url}`,
        headers: this.setHeaders(data, url),
        params: data?.params,
        data: data?.data,
      };
      const response: AxiosResponse<ApiResponse<T>> = await axios(axiosConfig);

      if (response.data.status === 401 || response.data.status === 403) {
        return Promise.reject("Unauthorized");
      }

      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return Promise.reject("Unauthorized");
      }
      return Promise.reject(error?.response?.data);
    }
  }

  public get<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return this.api<T>("GET", url, data);
  }

  public post<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return this.api<T>("POST", url, data);
  }

  public put<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return this.api<T>("PUT", url, data);
  }

  public delete<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return this.api<T>("DELETE", url, data);
  }

  private setHeaders(data?: RequestData, url?: string): Record<string, string> {
    const headers: Record<string, string> = {
      "accept-language": "en",
      "Content-Type": "application/json",
    };

    if (data?.headers) {
      Object.assign(headers, data.headers);
    }

    if (this.isLoggedIn) {
      const idToken = getLocalStrorageItem()?.auth?.user?.access_token;
      const state = localStorage.getItem("state") ?? "{}";

      if (idToken && state) {
        headers["Authorization"] = idToken;
      }
    }

    return headers;
  }
}
