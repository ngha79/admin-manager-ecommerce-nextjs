import { IMessage } from "@/types/conversations";
import { format } from "date-fns";
import React from "react";

const MessageDelete = ({ message }: { message: IMessage }) => {
  return (
    <div
      title={format(message.deletedAt, "dd/MM/yyyy H:mm")}
      className="flex px-4 py-2 text-sm text-gray-700 items-start gap-2 md:w-2/3 mx-4 my-2 bg-background rounded-md shadow-sm"
    >
      Tin nhắn đã được thu hồi
    </div>
  );
};

export default MessageDelete;
