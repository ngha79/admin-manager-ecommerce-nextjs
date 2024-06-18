import React from "react";

import InventoryList from "./InventoryList";
import { getInventories } from "@/utils/actions/inventory";

const Page = async ({
  searchParams,
}: {
  searchParams: { page: number; limit: number };
}) => {
  let listInventory = null;
  try {
    listInventory = await getInventories({
      page: searchParams.page || 1,
      limit: 20,
    });
  } catch (error) {
    return null;
  }
  return (
    <div className="py-4 md:p-8 flex-1 flex flex-col gap-4 md:gap-8 px-4 container">
      <InventoryList listInventory={listInventory.payload.data} />
    </div>
  );
};

export default Page;
