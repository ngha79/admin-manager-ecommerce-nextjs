import React from "react";
import { Skeleton } from "../ui/skeleton";

const NotificationLoading = () => {
  return (
    <div className="flex flex-col gap-1 p-2 hover:bg-gray-100 bg-gray-50 relative group">
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="w-20 h-20 rounded-md" />
    </div>
  );
};

export default NotificationLoading;
