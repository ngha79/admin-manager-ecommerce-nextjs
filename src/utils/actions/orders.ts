import http from "@/lib/http";
import { IResponsePagination } from "../types/response-pagination";

export const getListOrders = async ({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search: string;
  status: string;
}) => {
  let url = "";
  if (search) url += `&search=${search}`;
  if (status) url += `&status=${status}`;
  return await http.get<IResponsePagination>(
    `/list-orders/shop-list?page=${page}&limit=${limit}&shopId=` + url,
    {
      token: true,
      next: {
        tags: ["orders"],
      },
    }
  );
};

export const updateOrder = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const response = await http.put<any>(
    `/list-orders/${id}`,
    { status },
    {
      token: true,
    }
  );
  return response;
};

export const getOrderById = async ({ id }: { id: string }) => {
  return await http.get<any>(`/list-orders/${id}`, {});
};
