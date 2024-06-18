"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Inventory from "./Inventory";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { getInventories } from "@/utils/actions/inventory";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";

export default function InventoryList({
  listInventory,
}: {
  listInventory: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [nextPage, setNextPage] = useState<number | null>(2);
  const [inventories, setInventories] = useState<any[]>([]);

  const { ref, inView } = useInView();

  const handleGetInventories = useCallback(async () => {
    if (isPending || !nextPage) return null;
    startTransition(async () => {
      try {
        const response = await getInventories({
          page: nextPage,
          limit: 10,
        });
        setInventories((prev) => [...prev, ...response.payload.data]);
        setNextPage(response.payload.nextPage);
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  }, [isPending, nextPage]);

  useEffect(() => {
    if (inView && nextPage) {
      handleGetInventories();
    }
  }, [inView, nextPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kho hàng sản phẩm</CardTitle>
        <CardDescription>Quản lý số lượng sản phẩm.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Ảnh</span>
              </TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="hidden md:table-cell">Giá</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Đã bán
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Thời gian tạo
              </TableHead>
              <TableHead>
                <span className="sr-only">Thao tác</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listInventory.length ? (
              listInventory.map((inventory: any) => (
                <Inventory inventory={inventory} key={inventory.id} />
              ))
            ) : (
              <span className="text-lg font-medium text-gray-600">
                Bạn không có sản phẩm nào đang bán.
              </span>
            )}
            {inventories.map((inventory: any) => (
              <Inventory inventory={inventory} key={inventory.id} />
            ))}
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
