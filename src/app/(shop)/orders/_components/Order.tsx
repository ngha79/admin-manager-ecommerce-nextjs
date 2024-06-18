"use client";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import ProductOrder from "./ProductOrder";
import OrderAction from "./OrderAction";
import { IListOrder } from "@/utils/types/product";
import { Button } from "@/components/ui/button";

const StatusOrder: any = {
  pending: (
    <div className="flex items-center text-amber-500 gap-2 line-clamp-2">
      <span className="line-clamp-1">Đơn hàng đang chờ xác nhận</span>
    </div>
  ),
  cancel: (
    <div className="flex items-center text-red-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được hủy</span>
    </div>
  ),
  confirmed: (
    <div className="flex items-center text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được xác nhận</span>
    </div>
  ),
  delivered: (
    <div className="flex items-center text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã giao hàng thành công</span>
    </div>
  ),
  shipping: (
    <div className="flex items-center text-blue-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đang trên đường giao</span>
    </div>
  ),
};

const Order = ({ orderData }: { orderData: IListOrder }) => {
  const {
    order,
    total_price,
    total_price_apply_discount,
    tracking_number,
    user,
    status,
  } = orderData;

  return (
    <div className="w-full space-y-4 bg-background rounded-md shadow-md p-4">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-2">
        <div className="text-gray-700 font-medium space-x-2">
          <span>Mã đơn hàng:</span>
          <span>{tracking_number}</span>
        </div>
        <div>{StatusOrder[status]}</div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <Image
          alt="avatar user"
          width={40}
          height={40}
          src={user.avatar || "/login.png"}
          className="w-10 h-10 rounded-full border"
        />
        <span className="font-medium">{user.userName}</span>
        <Button className="gap-1 ml-4">
          <MessageCircle size={18} />
          Chat ngay
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {order.map((item: any) => (
          <ProductOrder orderItem={item} key={item.id} />
        ))}
      </div>
      <div className="grid grid-cols-5 font-medium">
        <div aria-hidden className="col-span-3" />
        <div className="col-span-2 flex flex-col text-sm">
          <div className="grid grid-cols-2">
            <div className="text-start">Tổng:</div>
            <div className="text-end pr-6">
              {total_price.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-start">Mã giảm giá:</div>
            <div className="text-end pr-6">
              {total_price_apply_discount.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-start">Thanh toán:</div>
            <div className="text-end pr-6 text-destructive">
              {Number(total_price - total_price_apply_discount).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <OrderAction detail={true} orderId={orderData.id} status={status} />
    </div>
  );
};

export default Order;
