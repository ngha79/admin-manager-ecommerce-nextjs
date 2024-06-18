import { IReply } from "@/types/conversations";
import { Reply } from "lucide-react";
import Image from "next/image";
import React from "react";

const MessageReply = ({ replyMessage }: { replyMessage: IReply }) => {
  return (
    <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-md border">
      <Reply size={16} className="text-gray-700" />
      <Image
        alt="avatar user"
        src={
          replyMessage?.message.user?.avatar ||
          replyMessage?.message.shop?.avatar ||
          "/login.png"
        }
        width={24}
        height={24}
        className="w-6 h-6 rounded-full border bg-background cursor-pointer"
      />
      <span className="text-xs max-w-24 truncate font-medium">
        {replyMessage?.message.user?.userName ||
          replyMessage?.message.shop?.userName}
      </span>
      <span className="text-xs line-clamp-1">
        {replyMessage.message.content || "Đã gửi 1 ảnh"}
      </span>
    </div>
  );
};

export default MessageReply;
