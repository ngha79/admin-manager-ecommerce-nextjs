import { cn } from "@/lib/utils";
import { INotification } from "@/types/notification";
import Image from "next/image";
import React from "react";
import OptionNotification from "./OptionNotification";

const Notification = ({ notification }: { notification: INotification }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-2 hover:bg-gray-50 relative group",
        notification.noti_is_read ? "" : "bg-red-50"
      )}
    >
      <span className="text-sm font-medium">{notification.noti_title}</span>
      <span className="text-xs line-clamp-3 truncate">
        {notification.noti_desc}
      </span>
      <Image
        alt="image"
        src={"/login.png"}
        width={40}
        height={40}
        className="w-full h-full max-w-20 max-h-20"
      />
      <OptionNotification notification={notification} />
    </div>
  );
};

export default Notification;
