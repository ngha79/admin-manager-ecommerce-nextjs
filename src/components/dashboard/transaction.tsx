"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

interface TypeColumnInterface {
  [key: string]: string;
}

const TypeOrder: TypeColumnInterface = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  delivered: "Đang giao hàng",
  cancelled: "Đã hủy",
  shipping: "Đang vận chuyển",
};

const Transaction = ({ transaction }: { transaction: any }) => {
  const router = useRouter();

  const showDetailOrder = () => {
    router.push(`/orders/${transaction.id}`);
  };
  return (
    <TableRow onClick={showDetailOrder} className="cursor-pointer">
      <TableCell>
        <div className="font-medium max-w-20 truncate">
          {transaction.user.userName}
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {transaction.user.email}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <Badge
          className="text-xs"
          variant={
            transaction.status === "cancelled" ? "destructive" : "outline"
          }
        >
          {TypeOrder[transaction.status]}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell text-center lg:hidden xl:table-cell">
        {format(transaction.createdAt, "hh:mm dd/MM/yyyy")}
      </TableCell>
      <TableCell className="text-right font-medium">
        {Number(
          transaction.total_price - transaction.total_price_apply_discount
        )?.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        })}
      </TableCell>
    </TableRow>
  );
};

export default Transaction;
