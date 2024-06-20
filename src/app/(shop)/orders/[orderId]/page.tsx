import React from "react";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import OrderAction from "../_components/OrderAction";
import { getOrderById } from "@/utils/actions/orders";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http";
import ButtonChat from "@/components/conversation/ButtonChat";

const StatusOrder: any = {
  pending: (
    <div className="flex items-center text-xl font-medium text-amber-500 gap-2 line-clamp-2">
      <span className="line-clamp-1">Đơn hàng đang chờ xác nhận</span>
    </div>
  ),
  cancel: (
    <div className="flex items-center text-xl font-medium text-red-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được hủy</span>
    </div>
  ),
  confirmed: (
    <div className="flex items-center text-xl font-medium text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được xác nhận</span>
    </div>
  ),
  delivered: (
    <div className="flex items-center text-xl font-medium text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã giao hàng thành công</span>
    </div>
  ),
  shipping: (
    <div className="flex items-center text-xl font-medium text-blue-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đang trên đường giao</span>
    </div>
  ),
};

const Page = async ({ params }: { params: { orderId: string } }) => {
  let order = null;
  try {
    const response = await getOrderById({ id: params.orderId });
    order = response.payload;
  } catch (error) {
    if (error instanceof HttpError) {
      if ((error.status = 404)) throw notFound();
    }
    throw new Error();
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col bg-background p-4 rounded-md shadow-md">
        {StatusOrder[order?.status]}
        <div className="flex items-center gap-2 font-medium line-clamp-1">
          <p className="min-w-max">Mã đơn hàng:</p>
          <span className="min-w-52 line-clamp-1 text-lg">
            {order.tracking_number}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 bg-background rounded-md p-4 shadow-md overflow-hidden">
        <h3 className="flex items-center gap-2 text-rose-500 font-medium leading-5">
          <MapPin size={16} />
          <span className="line-clamp-1 text-lg md:text-xl">
            Địa Chỉ Nhận Hàng
          </span>
        </h3>
        <h3 className="font-semibold leading-5 w-max line-clamp-1 flex items-center gap-2">
          <span className="capitalize">{order.address?.userName}</span>
          <span>{order.address?.phoneNumber}</span>
          <span className="line-clamp-2 font-normal">
            {order.address?.address}
          </span>
        </h3>
      </div>
      <div className="bg-background rounded-md shadow-md flex flex-col">
        <div className="flex items-center gap-2 p-4">
          <Image
            alt="avatar user"
            width={40}
            height={40}
            src={order.user.avatar || "/login.png"}
            className="w-10 h-10 rounded-full border"
          />
          <span className="font-medium">{order.user.userName}</span>
          <ButtonChat userId={order.user.id} />
        </div>
        <div className="flex flex-col bg-background rounded-md">
          <div className="grid grid-cols-7 text-gray-500 p-4 max-md:text-sm">
            <span className="col-span-3 text-start">Sản phẩm</span>
            <span className="col-span-1 text-center line-clamp-1">Đơn Giá</span>
            <span className="col-span-1 text-center line-clamp-1">
              Số Lượng
            </span>
            <span className="col-span-2 text-end line-clamp-1">Thành tiền</span>
          </div>
          <div>
            {order.order.map((orderItem: any) => (
              <Link
                href={`/product/update/${orderItem?.product?.id}`}
                className="grid grid-cols-7 py-4 px-6 justify-center max-md:text-sm items-center hover:bg-gray-100"
                key={orderItem.id}
              >
                <div className="flex items-center gap-2 col-span-3">
                  <Image
                    alt="logo-product"
                    src={orderItem?.productAttribute?.thumb}
                    width={60}
                    height={60}
                    className="border rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium line-clamp-2">
                      {orderItem?.product?.name}
                    </span>
                    <span className="line-clamp-1">
                      {orderItem?.productAttribute?.material}
                    </span>
                    <span className="line-clamp-1">
                      {orderItem?.productAttribute?.size}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  {orderItem?.product?.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="text-center">{orderItem?.quantity}</div>
                <div className="col-span-2 gap-x-2 flex items-center justify-end">
                  <span className="text-red-500 font-medium">
                    {Number(
                      orderItem?.product?.price * orderItem?.quantity
                    )?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end border-y text-sm md:text-base border-gray-300 p-4">
          <div className="flex items-center w-1/2 justify-end">
            <span className="w-40 font-medium">Tổng tiền hàng</span>
            <span className="w-32 text-end font-medium">
              {order.total_price?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="flex items-center w-1/2 justify-end">
            <span className="w-40 font-medium">Voucher giảm giá</span>
            <span className="w-32 text-end font-medium">
              {order.total_price_apply_discount?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="flex items-center w-1/2 justify-end">
            <span className="w-40 font-medium">Tổng thanh toán</span>
            <span className="w-32 text-end font-medium text-destructive leading-5">
              {Number(
                order.total_price - order.total_price_apply_discount
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4 gap-4">
        <OrderAction orderId={order.id} status={order.status} />
      </div>
    </div>
  );
};

export default Page;
