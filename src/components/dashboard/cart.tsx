import React from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import http from "@/lib/http";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ICartProps {
  detailSales: {
    total_orders: string;
    total_revenue: string;
    new_products: string;
    total_customers: string;
  };
}

const Cart = async () => {
  let detailSales = null;
  try {
    const response = await http.put<any>(
      `/shop/detail-sales`,
      {},
      {
        token: true,
      }
    );
    detailSales = response.payload;
  } catch (error) {
    return detailSales;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Number(detailSales.total_revenue)?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{detailSales.total_customers}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{detailSales.total_orders}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sản phẩm mới</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {detailSales.new_products || 0}
          </div>
        </CardContent>
      </Card>
      {/* <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 kể từ giờ trước</p>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Cart;
