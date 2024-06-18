import React, { useState } from "react";

import { cn, ResponseExceptions } from "@/lib/utils";
import { Button } from "../ui/button";
import { INotification } from "@/types/notification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { toast } from "sonner";
import http from "@/lib/http";
import { useNotificationStore } from "@/utils/store/notification-store";

const OptionNotification = ({
  notification,
  className,
}: {
  notification: INotification;
  className?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const deleteNotification = useNotificationStore(
    (state) => state.deleteNotification
  );

  const handleOpen = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  const handleDeleteNotification = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    try {
      await http.delete(
        `/notifications/${notification.id}`,
        {},
        { token: true }
      );
      deleteNotification(notification.id);
      setOpen(false);
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  return (
    <Popover onOpenChange={(value) => setOpen(value)} open={isOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleOpen}
          className={cn(
            "group-hover:block hover:bg-gray-100 top-1/2 right-2 -translate-y-1/2 absolute border p-1 rounded-full bg-background",
            isOpen ? "" : "hidden",
            className
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2" align="end">
        <div className="grid gap-4">
          <Button
            variant={"ghost"}
            onClick={handleDeleteNotification}
            className="flex items-center justify-start gap-2 p-0 px-2"
          >
            <X className="w-5 h-5 text-gray-700" />
            <span>Gỡ thông báo này</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OptionNotification;
