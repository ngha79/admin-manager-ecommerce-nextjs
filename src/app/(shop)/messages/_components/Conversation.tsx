import React from "react";
import Link from "next/link";
import Image from "next/image";
import { vi } from "date-fns/locale";
import { sub, formatDistance } from "date-fns";

import { OptionConversation } from "./OptionConversation";

const Conversation = ({ conversation }: { conversation: any }) => {
  return (
    <Link
      href={`/messages/${conversation.id}`}
      className="flex items-center group relative w-full p-2 gap-2 hover:bg-gray-100 rounded-md"
    >
      <Image
        alt="avatar user"
        src={conversation.user.avatar || "/login.png"}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-medium line-clamp-1">
          {conversation.user.userName}
        </h3>
        {conversation?.la}
        <div className="flex items-center text-sm text-gray-700">
          {conversation?.latestMessage ? (
            <div className="flex flex-col">
              <span className="line-clamp-1 w-fit">
                {conversation.latestMessage?.content
                  ? conversation.latestMessage?.content
                  : "Đã gửi một vài ảnh"}
              </span>
              <span className="line-clamp-1 text-xs">
                {formatDistance(
                  sub(conversation.latestMessage.createdAt, {}),
                  new Date(),
                  { addSuffix: true, locale: vi }
                )}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <OptionConversation />
    </Link>
  );
};

export default Conversation;
