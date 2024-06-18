/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { IConversation } from "@/types/conversations";
import http, { HttpError } from "@/lib/http";
import { useConversationStore } from "@/utils/store/conversation-store";
import Header from "./_components/Header";
import Messages from "./_components/Messages";
import CreateMessage from "./_components/CreateMessage";

const Page = () => {
  const { conversationId } = useParams();
  const router = useRouter();
  const conversation = useConversationStore((state) => state.conversation);
  const conversations = useConversationStore((state) => state.conversations);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );

  const getConversation = async () => {
    try {
      const response = await http.get<IConversation>(
        `/conversation/${conversationId}`
      );
      setConversation(response.payload);
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status === 404) {
          return router.replace("/messages");
        }
      }
      throw new Error();
    }
  };

  useEffect(() => {
    const checkConversationIsInList = conversations.find(
      (conver) => conver.id === conversationId
    );
    if (!checkConversationIsInList) {
      getConversation();
    } else {
      setConversation(checkConversationIsInList);
    }
  }, [conversationId]);

  if (!conversation) return null;

  return (
    <div className="flex flex-col flex-1">
      <Header conversation={conversation} />
      <div className="flex-1 overflow-y-auto">
        <Messages conversation={conversation} />
      </div>
      <CreateMessage conversation={conversation} />
    </div>
  );
};

export default Page;
