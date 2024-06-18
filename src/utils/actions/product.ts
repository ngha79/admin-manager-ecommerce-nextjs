import { BrandProduct } from "@/lib/interface";
import { getUserId } from "./account";
import http from "@/lib/http";
import { IResponsePagination } from "../types/response-pagination";
import { IProduct } from "../types/product";

export async function createProduct(formData: any) {
  return await http.post("/product/", formData, {
    token: true,
  });
}

export const getListProduct = async ({
  page = 1,
  limit = 10,
  search = "",
  brand,
  order,
  publish,
  searchBy,
  shopId,
}: {
  page: number;
  limit: number;
  search: string;
  brand?: BrandProduct;
  publish?: boolean;
  shopId?: string;
  order?: "ASC" | "DESC";
  searchBy?: "ctime" | "price" | "sales";
}) => {
  let url = "";
  if (brand) url = url.concat(`&brand=${brand}`);
  if (searchBy) url = url.concat(`&searchBy=${searchBy}`);
  if (order) url = url.concat(`&order=${order}`);
  if (publish) url = url.concat(`&publish=${publish}`);
  return await http.get<IResponsePagination>(
    `/product/shop/list?page=${page}&limit=${limit}&search=${search}&shopId=${shopId}` +
      url,
    {
      next: {
        tags: ["products"],
      },
    }
  );
};

export const deleteProduct = async ({ productId }: { productId: string }) => {
  return await http.delete(
    `/product/${productId}`,
    {},
    {
      token: true,
    }
  );
};

export const publishProducts = async (data: { productIds: string[] }) => {
  return await http.patch("/product/publish", data, {
    token: true,
  });
};

export const unpublishProducts = async (data: { productIds: string[] }) => {
  return await http.patch("/product/unpublish", data, {
    token: true,
  });
};

export const getProductById = async (productId: string) => {
  return await http.get<IProduct>(`/product/info/${productId}`, {
    cache: "no-cache",
  });
};

export const updateProduct = async (productId: string, data: any) => {
  await http.put(`/product/${productId}`, data, {
    token: true,
  });
};
