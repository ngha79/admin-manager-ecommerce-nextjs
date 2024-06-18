import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NotificationLoading = () => {
  return (
    <div className="flex items-start gap-4 px-8 py-4 border-y">
      <Skeleton className="w-14 h-14 md:w-20 md:h-20 rounded-full" />
      <div className="flex flex-col gap-y-2 flex-1">
        <Skeleton className="h-6 md:w-[250px]" />
        <Skeleton className="h-4 md:w-[250px]" />
        <Skeleton className="w-full h-40 md:h-48 md:w-48 rounded-md" />
        <Skeleton className="h-4 md:w-[250px]" />
      </div>
      <Skeleton className="h-10 w-20 md:w-28 rounded-md" />
    </div>
  );
};

export default NotificationLoading;
