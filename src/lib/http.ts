import envConfig from "@/config";
import { getSession } from "@/utils/actions/account";
import { ResponseExceptions } from "./utils";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
  token?: boolean;
};

export const TOKEN_EXPIRED_ERROR_STATUS = 419;
export const REFRESH_TOKEN_ERROR_STATUS = 403;

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: "",
        }
      : {
          Authorization: "",
          "Content-Type": "application/json",
        };
  if (options?.token) {
    let accessToken = await getSession();
    baseHeaders.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_BACKEND_URL
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === TOKEN_EXPIRED_ERROR_STATUS) {
      if (typeof window !== "undefined") {
        try {
          const response = await fetch("/api/token", {
            method: "POST",
          });
          const newTokens = await response.json();
          if (!newTokens.tokens.accessToken) {
            throw new HttpError(data);
          }
          baseHeaders.Authorization = `Bearer ${newTokens.tokens.accessToken}`;
          const newRes = await fetch(fullUrl, {
            ...options,
            headers: {
              ...baseHeaders,
              ...options?.headers,
            } as any,
            body,
            method,
          });
          const newPayload: Response = await newRes.json();
          const newData = {
            status: newRes.status,
            payload: newPayload,
          };
          if (!newRes.ok) {
            throw new HttpError(newData);
          }
          return newData;
        } catch (error) {
          throw new HttpError({
            status: 400,
            payload: {
              message: ResponseExceptions.DEFAULT_ERROR,
            },
          });
        }
      }
    }
    throw new HttpError(data);
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
