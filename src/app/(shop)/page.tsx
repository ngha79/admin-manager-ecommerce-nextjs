import Cart from "@/components/dashboard/cart";
import Transactions from "@/components/dashboard/transactions";
import Comments from "@/components/dashboard/comments";

export default async function Dashboard() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Cart />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Transactions />
          <Comments />
        </div>
      </main>
    </div>
  );
}
