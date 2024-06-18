/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import http, { HttpError } from "@/lib/http";
import CreateMessage from "./_component/CreateMessage";
import { useConversationStore } from "@/utils/store/conversation-store";
import HeaderNewConversation from "./_component/HeaderNewConversation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const conversation = useConversationStore((state) => state.conversation);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const [user, setUser] = useState<any>(null);

  const getShopById = async () => {
    try {
      const response = await http.get<any>(`/user/${id}`);
      setUser(response.payload);
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
    getShopById();
  }, [id]);

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col flex-1">
      <HeaderNewConversation user={user} />
      <div className="flex-1 overflow-y-auto"></div>
      <CreateMessage user={user} />
    </div>
  );
};

export default Page;
