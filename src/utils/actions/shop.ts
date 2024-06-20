import http from "@/lib/http";
import { getUserId } from "./account";
import { IResponsePagination } from "../types/response-pagination";

export const profileShop = async () => {
  const userID = await getUserId();
  if (!userID) throw new Error();
  return await http.get<any>(`/shop/info-shop/${userID}`, {
    next: {
      tags: ["shop"],
    },
  });
};

export const updateProfileShop = async (data: any) => {
  return await http.put(`/shop`, data, {
    token: true,
  });
};

export const updateAvatarShop = async (form: any) => {
  return await http.post(`/shop/avatar`, form, {
    token: true,
  });
};

export const getDetailDashboard = async () => {
  return await http.put<any>(
    `/shop/detail-sales`,
    {},
    {
      token: true,
    }
  );
};

export const updateBackgroundShop = async (form: any) => {
  return await http.post(`/shop/background`, form, {
    token: true,
  });
};

export const getListShops = async ({
  page = 1,
  limit = 20,
  search = "",
  isActive,
  order,
}: {
  page: number;
  limit: number;
  search: string;
  isActive?: string;
  order?: string;
}) => {
  let url = `?limit=${limit}&page=${page}&search=${search}`;
  if (isActive) url += `&isActive=${isActive}`;
  if (order) url += `&order=${order}`;
  return http.get<IResponsePagination>(`/shop` + url, {
    cache: "no-store",
  });
};

export const updateStatusShop = async (data: any) => {
  return await http.put(`/shop/status`, data, {
    token: true,
  });
};

export const deleteShop = async (shopId: string) => {
  return await http.delete(
    `/shop/${shopId}`,
    {},
    {
      token: true,
    }
  );
};

export const createShop = async (formData: FormData) => {
  return await http.post(`/shop/admin`, formData, {
    token: true,
  });
};

export const updateProfileShopByAdmin = async (
  userId: string,
  formData: any
) => {
  return await http.put(`/shop/admin/${userId}`, formData, {
    token: true,
  });
};

export const changePasswordShop = async (data: any) => {
  return await http.put(`/shop/change-password`, data, {
    token: true,
  });
};

export const changePasswordShopLogin = async (data: any) => {
  return await http.put(`/shop/change-password-login`, data, {});
};
