"use client";

import {
  Image as ImageIcon,
  SendHorizontal,
  ShoppingCart,
  Smile,
  Ticket,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { IConversation, IMessage } from "@/types/conversations";
import { useConversationStore } from "@/utils/store/conversation-store";

const CreateMessage = ({ conversation }: { conversation: IConversation }) => {
  const [message, setMessage] = useState<string>("");
  const messageReply = useConversationStore((state) => state.replyMessage);
  const cancelReplyMessage = useConversationStore(
    (state) => state.cancelReplyMessage
  );

  const handleOnChange = (e: React.ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const handleCreateMessage = async () => {
    try {
      await http.post<IMessage>(
        "/conversation/message-shop",
        { content: message, conversationId: conversation.id },
        {
          token: true,
        }
      );
      setMessage("");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  const handleCreateMessageReply = async () => {
    if (messageReply?.conversationId !== conversation.id) return null;
    try {
      await http.post<IMessage>(
        `/conversation/message-reply-shop/${messageReply.conversationId}/${messageReply?.messageId}`,
        { content: message },
        {
          token: true,
        }
      );
      cancelReplyMessage();
      setMessage("");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  const createMessage = () => {
    if (messageReply && messageReply?.conversationId === conversation.id) {
      return handleCreateMessageReply();
    }
    handleCreateMessage();
  };

  const handleCancelReplyMessage = () => {
    cancelReplyMessage();
  };

  return (
    <div className="w-full bg-background p-2 border-t flex items-center gap-4 relative">
      {messageReply && messageReply?.conversationId === conversation.id ? (
        <div className="absolute bottom-full left-0 bg-background border-y text-sm text-gray-800 py-2 px-4 w-full flex items-center gap-2">
          <span>Đang phản hồi</span>
          <span className="font-semibold">{messageReply?.userName}</span>
          <div
            onClick={handleCancelReplyMessage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full border bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </div>
        </div>
      ) : null}
      <div className="flex items-center gap-1">
        <Button variant={"ghost"} size={"sm"}>
          <ImageIcon className="text-blue-500 w-5 h-5" />
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          <ShoppingCart className="text-blue-500 w-5 h-5" />
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          <Ticket className="text-blue-500 w-5 h-5" />
        </Button>
      </div>
      <div className="w-full flex items-center rounded-2xl bg-gray-200 px-2">
        <textarea
          placeholder="Aa"
          value={message}
          onChange={handleOnChange}
          className="outline-none bg-transparent rounded-lg w-full p-2 text-sm resize-none overflow-auto scrollbar-hide"
          cols={2}
        />
        <button>
          <Smile className="fill-blue-500 text-background w-7 h-7" />
        </button>
      </div>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={createMessage}
        disabled={!message}
      >
        <SendHorizontal className="text-background fill-blue-500 w-7 h-7" />
      </Button>
    </div>
  );
};

export default CreateMessage;
