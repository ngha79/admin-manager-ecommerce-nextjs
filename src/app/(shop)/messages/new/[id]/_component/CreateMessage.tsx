"use client";

import {
  Image as ImageIcon,
  SendHorizontal,
  ShoppingCart,
  Smile,
  Ticket,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { IConversation, IMessage } from "@/types/conversations";
import { useRouter } from "next/navigation";

interface INewConversation {
  user: {
    id: string;
    avatar?: string;
    background?: string;
    userName: string;
  };
}

const CreateMessage = ({ user }: INewConversation) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const handleCreateMessage = async () => {
    try {
      const newConversation = await http.post<IConversation>(
        "/conversation/shop",
        {
          userId: user.id,
        },
        { token: true }
      );
      await http.post<IMessage>(
        "/conversation/message",
        { content: message, conversationId: newConversation.payload.id },
        {
          token: true,
        }
      );
      router.push(`/messages/${newConversation.payload.id}`);
      setMessage("");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  return (
    <div className="w-full bg-background p-2 border-t flex items-center gap-4 relative">
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
        onClick={handleCreateMessage}
        disabled={!message}
      >
        <SendHorizontal className="text-background fill-blue-500 w-7 h-7" />
      </Button>
    </div>
  );
};

export default CreateMessage;
