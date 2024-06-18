import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { INotification } from "@/types/notification";
import OptionNotification from "@/components/navbar/OptionNotification";

const Notification = ({ notification }: { notification: INotification }) => {
  return (
    <Link
      href={`/user/account/notifications/${notification.id}`}
      className={cn(
        "flex items-start gap-4 px-8 py-4 hover:bg-red-50 border-y relative group",
        !notification.noti_is_read ? "bg-red-100" : ""
      )}
    >
      <Image
        alt="thumb noti"
        src={"/login.png"}
        width={80}
        height={80}
        className="w-14 h-14 md:w-20 md:h-20 rounded-full"
      />
      <div className="flex flex-col gap-y-1 flex-1">
        <h3 className="line-clamp-1 font-medium">{notification.noti_title}</h3>
        <span className="line-clamp-2 text-sm text-gray-500">
          {notification.noti_desc}
        </span>
        <Image alt="thumb noti" src={"/login.png"} width={200} height={120} />
        <span className="text-xs md:text-sm text-gray-500">
          {format(notification.createdAt, "hh:mm dd-MM-yyyy")}
        </span>
      </div>
      <Button variant={"outline"} size={"sm"}>
        Xem chi tiết
      </Button>
      <OptionNotification notification={notification} className="right-8" />
    </Link>
  );
};

export default Notification;
