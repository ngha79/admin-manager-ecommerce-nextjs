"use client";

import React from "react";
import { toast } from "sonner";

import http from "@/lib/http";
import { Button } from "@/components/ui/button";
import { ResponseExceptions } from "@/lib/utils";
import { useNotificationStore } from "@/utils/store/notification-store";

const UpdateAllNotification = () => {
  const updateAllNotification = useNotificationStore(
    (state) => state.setAllNotificationIsRead
  );

  const handleUpdateAllNotification = async () => {
    try {
      await http.patch("/notifications", {}, { token: true });
      updateAllNotification();
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  return (
    <Button
      variant={"outline"}
      className="text-xs"
      size={"sm"}
      onClick={handleUpdateAllNotification}
    >
      Đánh dấu tất cả là đã đọc
    </Button>
  );
};

export default UpdateAllNotification;
