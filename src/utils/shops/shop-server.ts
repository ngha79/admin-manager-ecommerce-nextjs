"use server";

import http from "@/lib/http";
import { IShop } from "../types/shop";

export const getProfileShop = async (shopId: string) => {
  return await http.get<IShop>(`/shop/${shopId}`, {
    cache: "no-store",
  });
};
