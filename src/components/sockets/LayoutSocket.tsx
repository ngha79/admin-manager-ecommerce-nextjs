"use client";

import { useContext, useEffect } from "react";

import http from "@/lib/http";
import { SocketContext } from "../contexts/SocketContext";
import { useConversationStore } from "@/utils/store/conversation-store";
import { IResponsePagination } from "@/utils/types/response-pagination";
import { useNotificationStore } from "@/utils/store/notification-store";
import { IConversation, IMessage } from "@/types/conversations";
import { INotification } from "@/types/notification";

interface IProps {
  message: IMessage;
  conversation: IConversation;
}
export default function LayoutSocket({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket, token } = useContext(SocketContext);
  // Conversations
  const conversationStore = useConversationStore();
  const notificationStore = useNotificationStore();

  useEffect(() => {
    if (!socket || !token) return;
    const handleNewConversation = ({
      conversation,
    }: {
      conversation: IConversation;
    }) => {
      conversationStore.newConversation(conversation);
    };

    const handleMessage = ({ message, conversation }: IProps) => {
      conversationStore.newMessageConversation(message, conversation);
    };

    const handleMessageUpdate = ({ message, conversation }: IProps) => {
      conversationStore.updateMessageConversation(message, conversation.id);
    };

    const handleMessageDelete = ({ message, conversation }: IProps) => {
      conversationStore.deleteMessageConversation(message, conversation.id);
    };

    const handleNotification = (notification: INotification) => {
      notificationStore.newNotification(notification);
    };

    socket.on("newConversation", handleNewConversation);
    socket.on("onMessage", handleMessage);
    socket.on("onMessageUpdate", handleMessageUpdate);
    socket.on("onMessageDelete", handleMessageDelete);
    socket.on("onNotification", handleNotification);

    return () => {
      socket.off("newConversation", handleMessage);
      socket.off("onMessage", handleMessage);
      socket.off("onMessageUpdate", handleMessageUpdate);
      socket.off("onMessageDelete", handleMessageDelete);
      socket.off("onNotification", handleNotification);
    };
  }, [socket, token]);

  async function getConversations() {
    conversationStore.setLoading(true);
    try {
      const {
        payload: { data, nextPage },
      } = await http.get<IResponsePagination>(
        "/conversation?page=1&limit=20&search=",
        {
          token: true,
        }
      );
      conversationStore.setConversations(data, nextPage);
    } catch (error) {
      console.log("Get Conversations Error");
    } finally {
      conversationStore.setLoading(false);
    }
  }

  async function getNotifications() {
    try {
      const {
        payload: { data, nextPage },
      } = await http.get<IResponsePagination>(
        "/notifications/shop?page=1&limit=20",
        {
          token: true,
        }
      );
      notificationStore.setNotification(data, nextPage);
    } catch (error) {
      console.log("Get Notifications Error");
    } finally {
      notificationStore.setLoading();
    }
  }

  useEffect(() => {
    getConversations();
    getNotifications();
  }, []);

  return <>{children}</>;
}
