import { toast } from "sonner";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Conversation from "./Conversation";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { IResponsePagination } from "@/utils/types/response-pagination";
import { useConversationStore } from "@/utils/store/conversation-store";

const GetNextConversation = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const paginationConversation = useConversationStore(
    (state) => state.paginationConversation
  );
  const nextPage = useConversationStore((state) => state.page);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && nextPage) {
      handleFetchConversations();
    }
  }, [inView, nextPage]);

  const handleFetchConversations = async () => {
    try {
      const res = await http.get<IResponsePagination>(
        `/conversation?page=${nextPage}&limit=20&search=`
      );
      paginationConversation(res.payload.data, res.payload.nextPage);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };
  return (
    <div className="flex overflow-auto flex-col h-full">
      {conversations.map((conver: any, index: number) => (
        <Conversation conversation={conver} key={index} />
      ))}
      <div ref={ref}>
        {nextPage ? (
          <div className="flex items-center gap-2 rounded-md shadow-md p-2 bg-gray-200 animate-pulse">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GetNextConversation;
