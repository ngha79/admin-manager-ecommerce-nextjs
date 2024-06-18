"use server";

import http from "@/lib/http";
import { getUserId } from "./account";
import { IResponsePagination } from "../types/response-pagination";

export const getInventories = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const userId = await getUserId();
  return await http.get<IResponsePagination>(
    `/inventories?page=${page}&limit=${limit}&shopId=${userId}`,
    {
      token: true,
      next: {
        tags: ["inventories"],
      },
    }
  );
};

export const updateStockProduct = async ({
  id,
  stock,
}: {
  id: number;
  stock: number;
}) => {
  return await http.patch(
    `/inventories/${id}`,
    {
      body: JSON.stringify({ stock }),
    },
    { token: true }
  );
};
