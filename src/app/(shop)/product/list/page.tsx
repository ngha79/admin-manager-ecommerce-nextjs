import React from "react";
import { getListProduct } from "@/utils/actions/product";
import { BrandProduct } from "@/lib/interface";
import DataTableDemo from "./data-table";
import { getUserId } from "@/utils/actions/account";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    sortBy: "ctime" | "price" | "sales";
    page: number;
    orderBy: "ASC" | "DESC";
    publish: boolean;
    brand: BrandProduct;
  };
}) => {
  const { search, sortBy, page, orderBy, publish, brand } = searchParams;
  let products = null;
  try {
    const userId = await getUserId();
    products = await getListProduct({
      limit: 10,
      page: page,
      search,
      brand,
      order: orderBy,
      publish,
      shopId: userId,
      searchBy: sortBy,
    });
  } catch (error) {
    throw new Error();
  }

  return (
    <div className="flex flex-col flex-1 p-4 md:p-8 overflow-x-auto gap-4">
      <h1 className="text-2xl font-medium">Danh sách sản phẩm</h1>
      <DataTableDemo
        products={products.payload?.data}
        nextPage={products.payload?.nextPage}
        lastPage={products.payload?.lastPage}
        prevPage={products.payload?.prevPage}
        search={search}
      />
    </div>
  );
};

export default Page;
