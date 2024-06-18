"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Orders from "./Orders";
import { IListOrder } from "@/utils/types/product";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { getListOrders } from "@/utils/actions/orders";

const ListOrders = ({
  listOrder,
  nextPage,
}: {
  listOrder: IListOrder[];
  nextPage: number | null;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [isPending, startTransition] = useTransition();
  const [orders, setOrders] = useState<IListOrder[]>([]);
  const [nextPageOrders, setNextPageOrders] = useState<number | null>(null);

  const handleGetListOrders = useCallback(() => {
    if (!nextPageOrders || isPending) return null;
    startTransition(async () => {
      try {
        const res = await getListOrders({
          limit: 5,
          page: nextPageOrders,
          search: "",
          status: status === "all" ? "" : status,
        });
        setOrders((prev) => [...prev, ...res.payload.data]);
        setNextPageOrders(res.payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [nextPageOrders, isPending, status]);

  useEffect(() => {
    if (inView && nextPageOrders) {
      handleGetListOrders();
    }
  }, [inView, nextPageOrders]);

  useEffect(() => {
    setNextPageOrders(nextPage);
  }, [nextPage]);

  const handleSetTypePurchase = (typeOrder: string) => {
    const params = new URLSearchParams(searchParams);
    setStatus(typeOrder);
    params.set("status", typeOrder);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-4">
      <Tabs value={status} className="space-y-4">
        <TabsList className="w-full flex justify-between overflow-x-auto shadow-login rounded-md overflow-y-hidden">
          <TabsTrigger
            className="w-full"
            value="all"
            onClick={() => handleSetTypePurchase("all")}
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="shipping"
            onClick={() => handleSetTypePurchase("shipping")}
          >
            Vận chuyển
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="pending"
            onClick={() => handleSetTypePurchase("pending")}
          >
            Chờ xác nhận
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="confirmed"
            onClick={() => handleSetTypePurchase("confirmed")}
          >
            Chờ giao hàng
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="cancelled"
            onClick={() => handleSetTypePurchase("cancelled")}
          >
            Đã hủy
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="delivered"
            onClick={() => handleSetTypePurchase("delivered")}
          >
            Hoàn thành
          </TabsTrigger>
        </TabsList>
        {listOrder.length ? (
          <div className="space-y-4">
            <Orders orders={listOrder} />
            <Orders orders={orders} />
            <div ref={ref}>
              {isPending ? (
                <div className="flex items-center justify-center pt-8">
                  <div
                    className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="h-[700px] flex flex-col gap-4 items-center justify-center text-sm text-gray-700">
            <Image alt="logo" src={"/order-image.png"} width={80} height={80} />
            <span className="font-medium text-lg">Chưa có đơn hàng</span>
          </div>
        )}
      </Tabs>
    </section>
  );
};

export default ListOrders;
