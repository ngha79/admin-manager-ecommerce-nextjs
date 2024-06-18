"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Notification from "./Notification";
import { buttonVariants } from "../ui/button";
import NotificationLoading from "./NotificationLoading";
import UpdateAllNotification from "./UpdateAllNotification";
import { useNotificationStore } from "@/utils/store/notification-store";

const Notifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-11 h-11 rounded-full p-0 border-gray-300 hover:bg-gray-200"
          )}
        >
          <Bell size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" side="bottom" align="end">
        <DropdownMenuLabel className="flex items-center justify-between text-xl">
          Thông báo
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center justify-between">
          <UpdateAllNotification />
          <Link
            href={"/notifications"}
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "text-xs"
            )}
          >
            Xem tất cả
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <>
            <NotificationLoading />
            <NotificationLoading />
          </>
        ) : (
          <div className="overflow-auto max-h-96">
            {notifications.map((notification) => (
              <Notification notification={notification} key={notification.id} />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
