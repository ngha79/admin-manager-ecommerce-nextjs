"use client";

import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";

import Orders from "./Orders";
import { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { getListOrders } from "@/utils/actions/orders";

const PaginationOrders = ({ page }: { page: number | null }) => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const type = searchParams.get("status") || "all";

  const [orders, setOrders] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [nextPage, setNextPage] = useState<number | null>(null);

  const handleFetch = useCallback(() => {
    if (!nextPage || isPending) return null;
    startTransition(async () => {
      try {
        const res = await getListOrders({
          limit: 5,
          page: nextPage,
          search: "",
          status: type === "all" ? "" : type,
        });
        setOrders([...orders, ...res.payload.data]);
        setNextPage(res.payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [orders, isPending, nextPage, type]);

  useEffect(() => {
    if (inView && nextPage) {
      handleFetch();
    }
  }, [inView, nextPage]);

  useEffect(() => {
    setNextPage(page);
    setOrders([]);
  }, [page]);

  return (
    <div className="space-y-4">
      <Orders orders={orders} />
      {nextPage ? (
        <div ref={ref} className="flex items-center justify-center pt-8">
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
  );
};

export default PaginationOrders;
