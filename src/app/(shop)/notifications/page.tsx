import { Metadata } from "next";
import UpdateAllNotification from "./_components/UpdateAllNotification";
import ListNotification from "./_components/ListNotification";

export const metadata: Metadata = {
  title: "Thông báo | Mua ngay | ShopDev",
  description: "Thông báo | Mua ngay | ShopDev",
};
const Notification = () => {
  return (
    <div className="h-full container">
      <div className="flex items-center justify-between py-4 px-6 border-b">
        <h1 className="font-semibold text-lg text-gray-700">
          Tất cả thông báo
        </h1>
        <UpdateAllNotification />
      </div>
      <ListNotification />
    </div>
  );
};

export default Notification;
