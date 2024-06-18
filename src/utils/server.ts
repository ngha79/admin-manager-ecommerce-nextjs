"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const reFetchShops = async () => {
  return revalidateTag("shopList");
};

export const reFetchUsers = async () => {
  return revalidateTag("users");
};

export const reFetchProducts = async () => {
  return revalidateTag("products");
};

export const reFetchUser = async () => {
  revalidatePath("/users/update/:id");
};

export const reFetchDiscounts = async () => {
  return revalidateTag("discounts");
};

export const reFetchInventoriess = async () => {
  return revalidateTag("inventories");
};

export const reFetchReviews = async () => {
  return revalidateTag("reviews");
};

export const reFetchReview = async () => {
  return revalidateTag("review");
};

export const reFetchShop = async () => {
  return revalidateTag("shop");
};

export const reFetchBlog = async () => {
  return revalidateTag("blogs");
};

export const reFetchTag = async (tag: string) => {
  return revalidateTag(tag);
};

export const loginServer = (tokens: any) => {
  return tokens;
};
