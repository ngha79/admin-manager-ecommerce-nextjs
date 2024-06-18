import React from "react";
import FormUpdate from "./FormUpdate";
import { notFound } from "next/navigation";
import { getProfileShop } from "@/utils/shops/shop-server";
import { HttpError } from "@/lib/http";

const Page = async ({ params }: { params: { id: string } }) => {
  let shop = null;
  try {
    shop = await getProfileShop(params.id);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 404) {
        throw notFound();
      }
    }
    throw new Error();
  }
  return <FormUpdate user={shop.payload} />;
};

export default Page;
