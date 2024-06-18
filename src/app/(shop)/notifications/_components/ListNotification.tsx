"use client";

import React, { useEffect, useTransition } from "react";

import { useNotificationStore } from "@/utils/store/notification-store";
import Notification from "./Notification";
import NotificationLoading from "./NotificationLoading";
import { useInView } from "react-intersection-observer";
import http from "@/lib/http";
import { IResponsePagination } from "@/utils/types/response-pagination";

const ListNotification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const page = useNotificationStore((state) => state.page);
  const notificationStore = useNotificationStore();

  const [isPending, startTransition] = useTransition();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  async function fetchNotifications() {
    if (isPending || isLoading || !page) return;
    startTransition(async () => {
      try {
        const response = await http.get<IResponsePagination>(
          `/notifications?page=${page}&limit=20`,
          {
            token: true,
          }
        );
        notificationStore.setNotificationPagination(
          response.payload.data,
          response.payload.nextPage
        );
      } catch (error) {
        console.error("Error fetching notifications:");
      } finally {
        notificationStore.setLoading();
      }
    });
  }

  useEffect(() => {
    if (inView && page) {
      fetchNotifications();
    }
  }, [inView, page]);
  return (
    <div className="min-h-[550px] flex flex-col py-8">
      {isLoading ? (
        <>
          <NotificationLoading />
          <NotificationLoading />
        </>
      ) : null}
      <div>
        {notifications.map((item) => (
          <Notification key={item.id} notification={item} />
        ))}
        <div ref={ref}>
          {isPending ? (
            <div className="flex items-center justify-center pt-8">
              <NotificationLoading />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListNotification;
