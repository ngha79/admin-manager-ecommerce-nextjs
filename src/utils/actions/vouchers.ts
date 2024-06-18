import http from "@/lib/http";
import { getUserId } from "./account";
import { IResponsePagination } from "../types/response-pagination";

export const getListVoucherShop = async ({
  page = 1,
  limit,
  search = "",
  isActive,
}: any) => {
  const userId = await getUserId();
  let url = "";
  if (isActive) url += `&isActive=${isActive}`;
  return await http.get<IResponsePagination>(
    `/discounts?page=${page}&limit=${limit}&search=${search}&shopId=${userId}` +
      url,
    {
      next: {
        tags: ["discounts"],
      },
    }
  );
};

export const getVoucher = async (id: string) => {
  return await http.get<any>(`/discounts/${id}`, {});
};

export const updateVoucher = async (id: string, formData: any) => {
  return await http.put(`/discounts/${id}`, formData, {
    token: true,
  });
};

export const createVoucher = async (formData: any) => {
  return await http.post(`/discounts`, formData, {
    token: true,
  });
};

export const deleteVoucher = async (id: string) => {
  return await http.delete(
    `/discounts/${id}`,
    {},
    {
      token: true,
    }
  );
};
