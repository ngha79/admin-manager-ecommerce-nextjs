import { toast } from "sonner";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { Copy, Eye, Pen, Reply, Smile, ThumbsUp, Trash } from "lucide-react";

import http from "@/lib/http";
import { Button } from "@/components/ui/button";
import { ResponseExceptions } from "@/lib/utils";
import { IMessage } from "@/types/conversations";
import { useConversationStore } from "@/utils/store/conversation-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MessageOptions = ({
  message,
  handleUpdate,
}: {
  message: IMessage;
  handleUpdate: () => void;
}) => {
  const params = useParams();

  const [isLoading, startTransition] = useTransition();

  const setReplyMessage = useConversationStore(
    (state) => state.setReplyMessage
  );

  const handleDeleteMessage = () => {
    startTransition(async () => {
      try {
        await http.delete<IMessage>(
          `/conversation/message-shop/${params.conversationId}/${message.id}`,
          {},
          { token: true }
        );
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  };

  const handleReplyMessage = () => {
    setReplyMessage({
      conversationId: params.conversationId as string,
      messageId: message.id,
      userName: message.shop?.userName || message.user?.userName || "",
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2 gap-2 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-center">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <ThumbsUp size={18} />
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <Smile size={18} />
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <Eye size={18} />
            </button>
          </div>
        </div>
        <Button
          variant={"ghost"}
          onClick={handleReplyMessage}
          className="w-full flex items-center justify-between"
        >
          <span className="text-xs">Trả lời</span>
          <Reply size={16} />
        </Button>
        {message.shop ? (
          <Button
            variant={"ghost"}
            onClick={handleUpdate}
            className="w-full flex items-center justify-between"
          >
            <span className="text-xs">Chỉnh sửa tin nhắn</span>
            <Pen size={16} />
          </Button>
        ) : null}
        {message.content ? (
          <Button
            variant={"ghost"}
            onClick={() => navigator.clipboard.writeText(message.content || "")}
            className="w-full flex items-center justify-between"
          >
            <span className="text-xs">Sao chép văn bản</span>
            <Copy size={16} />
          </Button>
        ) : null}
        {message.shop ? (
          <Button
            variant={"destructive"}
            onClick={handleDeleteMessage}
            disabled={isLoading}
            className="w-full flex items-center justify-between bg-background text-red-500"
          >
            <span className="text-xs">Xóa bình luận</span>
            <Trash size={16} />
          </Button>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default MessageOptions;
