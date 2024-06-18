import React from "react";
import DataShops from "./data-table-shops";
import { getListShops } from "@/utils/actions/shop";

const Page = async ({
  searchParams: { page, limit, search, order, isActive },
}: {
  searchParams: {
    page: number;
    limit: number;
    search: string;
    order: string;
    isActive: string;
  };
}) => {
  let shops = null;
  try {
    shops = await getListShops({
      page: page || 1,
      limit: limit || 20,
      search: search || "",
      order,
      isActive,
    });
  } catch (error) {
    throw new Error();
  }
  const { data, lastPage, nextPage, prevPage } = shops.payload;
  return (
    <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-4">
      <DataShops
        order={order}
        searchShop={search}
        shops={data}
        lastPage={lastPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default Page;
