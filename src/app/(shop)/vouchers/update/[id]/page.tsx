import { getVoucher } from "@/utils/actions/vouchers";
import React from "react";
import FormUpdate from "./FormUpdate";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  let voucher = null;
  try {
    voucher = await getVoucher(params.id);
  } catch (error: any) {
    if (error?.status === 404 || error?.payload.status === 404) {
      return notFound();
    }
    throw new Error();
  }
  return (
    <div className="container py-4 space-y-4">
      <h1 className="font-bold text-2xl">Cập nhật mã giảm giá</h1>
      <FormUpdate id={params.id} voucher={voucher.payload} />
    </div>
  );
};

export default Page;
