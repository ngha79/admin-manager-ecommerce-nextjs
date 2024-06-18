import http from "@/lib/http";
import { getUserId } from "./account";
import { IListComment } from "@/components/reviews/ListReview";
import { IResponsePagination } from "../types/response-pagination";

export async function getRatingShop({ shopId }: { shopId?: string }) {
  const userId = await getUserId();
  return await http.get<any>(`/comment-product/shop/${shopId ?? userId}`, {});
}

export async function getListRating({
  limit,
  page,
  shopId,
  order,
  productId,
  rating,
}: {
  limit: number;
  page: number;
  shopId?: string;
  order?: string;
  productId?: string;
  rating?: number;
}) {
  const userId = await getUserId();
  let url = "";
  if (order) url = url.concat(`&order=${order}`);
  if (productId) url = url.concat(`&productId=${productId}`);
  if (rating) url = url.concat(`&rating=${rating}`);
  return await http.get<IResponsePagination>(
    `/comment-product?limit=${limit}&page=${page}&shopId=${shopId ?? userId}` +
      url,
    {
      next: {
        tags: ["reviews"],
      },
    }
  );
}

export const createCommentReplyUser = async (formData: any) => {
  return await http.post(`/shop-comment-product`, formData, {
    token: true,
  });
};

export const getCommentUser = async (id: string) => {
  return await http.get<IListComment>(`/comment-product/comment/${id}`, {
    next: {
      tags: ["review"],
      revalidate: 300,
    },
  });
};
