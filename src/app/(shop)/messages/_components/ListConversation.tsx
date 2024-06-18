"use client";

import React from "react";

import Conversations from "./Conversations";
import { Skeleton } from "@/components/ui/skeleton";
import GetNextConversation from "./GetNextConversation";
import { useConversationStore } from "@/utils/store/conversation-store";

const ListConversation = () => {
  const isLoading = useConversationStore((state) => state.isLoading);
  return (
    <Conversations>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-md shadow-md p-2 bg-gray-200 animate-pulse">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md shadow-md p-2 bg-gray-200 animate-pulse">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md shadow-md p-2 bg-gray-200 animate-pulse">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md shadow-md p-2 bg-gray-200 animate-pulse">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ) : (
        <GetNextConversation />
      )}
    </Conversations>
  );
};

export default ListConversation;
