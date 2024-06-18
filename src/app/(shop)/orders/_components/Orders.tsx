import { IListOrder } from "@/utils/types/product";
import Order from "./Order";

const Orders = ({ orders }: { orders: IListOrder[] }) => {
  return (
    <section className="flex flex-col gap-4">
      {orders.map((order: any) => (
        <Order key={order.id} orderData={order} />
      ))}
    </section>
  );
};

export default Orders;
