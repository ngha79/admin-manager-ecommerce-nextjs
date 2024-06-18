import { getProductById } from "@/utils/actions/product";
import { notFound } from "next/navigation";
import React from "react";
import Product from "./product";
import { HttpError } from "@/lib/http";

const Page = async ({ params }: { params: { id: string } }) => {
  let product = null;
  try {
    product = await getProductById(params.id);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 404) return notFound();
    }

    throw new Error();
  }
  return <Product product={product.payload} />;
};

export default Page;
