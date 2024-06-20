import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Transaction from "./transaction";
import { Button } from "@/components/ui/button";
import { getListOrders } from "@/utils/actions/orders";
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

const Transactions = async () => {
  let transactions = null;
  try {
    const response = await getListOrders({
      page: 1,
      limit: 20,
      search: "",
      status: "",
    });
    transactions = response.payload.data;
  } catch (error) {
    return null;
  }

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Giao dịch</CardTitle>
          <CardDescription>
            Các giao dịch gần đây từ cửa hàng của bạn.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/orders">
            Xem tất cả
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      {transactions.length ? (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead className="table-cell text-center">
                  Trạng thái
                </TableHead>
                <TableHead className="hidden md:table-cell text-center lg:hidden xl:table-cell">
                  Date
                </TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <Transaction transaction={transaction} key={transaction.id} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <CardContent>
          <CardDescription className="text-center">
            Không có đơn hàng nào gần đây
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
};

export default Transactions;
