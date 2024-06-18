import http from "@/lib/http";

const authApiRequest = {
  me: () => http.get<any>("/shop/me", { token: true }),
  login: (body: any) => http.post<any>("/auth/shop/login", body),
  registerShop: (body: any) => http.post<any>("/auth/shop/register", body),
};

export default authApiRequest;
