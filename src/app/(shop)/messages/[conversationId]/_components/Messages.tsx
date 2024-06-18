import React, { useState, useEffect, useCallback, useTransition } from "react";
import { IConversation } from "@/types/conversations";
import { useInView } from "react-intersection-observer";
import { IResponsePagination } from "@/utils/types/response-pagination";
import http, { HttpError } from "@/lib/http";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";
import { useConversationStore } from "@/utils/store/conversation-store";
import Message from "./Message";

const Messages = ({ conversation }: { conversation: IConversation }) => {
  const [nextPage, setNextPage] = useState<number | null | undefined>(
    conversation.page
  );
  const [isLoading, startLoading] = useTransition();

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "20px",
  });

  const setMessagesPagination = useConversationStore(
    (state) => state.setMessagesPagination
  );

  const handleFetch = useCallback(() => {
    if (isLoading || !nextPage) return;
    startLoading(async () => {
      try {
        const res = await http.get<IResponsePagination>(
          `/conversation/messages-all?page=${nextPage}&limit=20&conversationId=${conversation.id}`
        );
        setMessagesPagination(
          res.payload.data,
          conversation.id,
          res.payload.nextPage
        );
        setNextPage(res.payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [isLoading, nextPage, conversation.id, setMessagesPagination]);

  useEffect(() => {
    if (inView && nextPage) {
      handleFetch();
    }
  }, [inView, nextPage]);

  return (
    <div className="flex overflow-auto flex-col-reverse h-full">
      {conversation?.messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      <div ref={ref}>
        {isLoading ? (
          <div className="flex items-center justify-center pt-8">
            <div
              className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Messages;
