"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn, ResponseExceptions } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import http from "@/lib/http";
import { Check, X } from "lucide-react";

interface OrderActionProps {
  orderId: string;
  status: string;
  detail?: boolean;
}

const OrderAction: React.FC<OrderActionProps> = ({
  orderId,
  status,
  detail,
}) => {
  const [statusOrder, setStatus] = useState<string>(status);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async (action: string) => {
    setIsLoading(true);
    try {
      const response = await http.put<any>(
        `/list-orders/${action}/${orderId}`,
        { status },
        {
          token: true,
        }
      );
      setStatus(response.payload.status);
      toast.success("Cập nhật đơn hàng thành công.");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const ActionOrder: Record<string, JSX.Element> = {
    pending: (
      <>
        <Button
          variant="destructive"
          onClick={() => handleUpdateStatus("cancel")}
          disabled={isLoading}
        >
          <X className="w-5 h-5 mr-2" />
          Từ chối
        </Button>
        <Button
          onClick={() => handleUpdateStatus("confirm")}
          disabled={isLoading}
          variant="success"
        >
          <Check className="w-5 h-5 mr-2" /> Xác nhận
        </Button>
      </>
    ),
    cancelled: (
      <Button variant="destructive" disabled>
        Đã hủy
      </Button>
    ),
    confirmed: (
      <>
        <Button
          variant="destructive"
          onClick={() => handleUpdateStatus("cancel")}
          disabled={isLoading}
        >
          Hủy đơn hàng
        </Button>
        <Button
          onClick={() => handleUpdateStatus("shipping")}
          variant="success"
          disabled={isLoading}
        >
          Giao hàng
        </Button>
      </>
    ),
    shipping: (
      <>
        <Button
          variant="destructive"
          onClick={() => handleUpdateStatus("cancel")}
          disabled={isLoading}
        >
          Hủy đơn hàng
        </Button>
        <Button
          onClick={() => handleUpdateStatus("delivered")}
          variant="success"
          disabled={isLoading}
        >
          Đã giao hàng
        </Button>
      </>
    ),
    delivered: (
      <Button
        onClick={() => handleUpdateStatus("delivered")}
        variant="success"
        disabled
      >
        Đã giao hàng
      </Button>
    ),
  };

  return (
    <div className="gap-4 flex justify-end">
      {detail ? (
        <Link
          href={`/orders/${orderId}`}
          className={cn([buttonVariants({ variant: "outline" })])}
        >
          Chi tiết
        </Link>
      ) : null}
      {ActionOrder[statusOrder]}
      {!detail ? (
        <Button
          className="w-max"
          disabled={isLoading}
          onClick={() => router.push("/orders")}
        >
          Trở về
        </Button>
      ) : null}
    </div>
  );
};

export default OrderAction;
