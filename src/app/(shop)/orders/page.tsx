import React from "react";

import ListOrders from "./_components/ListOrders";
import { getListOrders } from "@/utils/actions/orders";

const Page = async ({
  searchParams: { search, status },
}: {
  searchParams: { search: string; status: string };
}) => {
  let orders = null;
  try {
    orders = await getListOrders({
      page: 1,
      limit: 5,
      search: search || "",
      status: status !== "all" ? status : "",
    });
  } catch (error) {
    throw new Error();
  }

  return (
    <main className="p-4 max-w-7xl mx-auto py-6 w-full flex flex-col gap-4">
      <h1 className="text-lg font-medium">Danh sách đơn hàng</h1>
      <ListOrders
        listOrder={orders.payload.data}
        nextPage={orders.payload.nextPage}
      />
    </main>
  );
};

export default Page;
