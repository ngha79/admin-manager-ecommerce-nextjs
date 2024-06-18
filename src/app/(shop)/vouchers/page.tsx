import React from "react";
import DataTableDemo from "./data-table";
import { getListVoucherShop } from "@/utils/actions/vouchers";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: number;
    isActive: boolean;
  };
}) => {
  const { search, page, isActive } = searchParams;
  let vouchers = null;
  try {
    vouchers = await getListVoucherShop({
      limit: 10,
      page: page,
      search,
      isActive,
    });
  } catch (error) {
    throw new Error();
  }
  return (
    <div className="container py-4 flex flex-col size-full overflow-x-auto gap-4">
      <h1 className="font-bold text-2xl">Danh sách mã giảm giá</h1>
      <DataTableDemo
        voucher={vouchers?.payload?.data || []}
        nextPage={vouchers?.payload?.nextPage}
        lastPage={vouchers?.payload?.lastPage}
        prevPage={vouchers?.payload?.prevPage}
        searchVoucher={search}
      />
    </div>
  );
};

export default Page;
