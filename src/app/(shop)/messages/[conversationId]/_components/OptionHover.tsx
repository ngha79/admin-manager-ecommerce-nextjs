import React, { useRef, useState } from "react";
import { Pen, Reply, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IMessage } from "@/types/conversations";
import { format } from "date-fns";
import { useOnClickOutside } from "@/helpers/use-click-outside";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/utils/store/conversation-store";
import { useParams } from "next/navigation";
import MessageOptions from "./MessageOptions";
import UpdateMessage from "./UpdateMessage";
import MessageReply from "./MessageReply";

interface OptionHoverProps {
  message: IMessage;
}

const OptionHover: React.FC<OptionHoverProps> = ({ message }) => {
  const params = useParams();
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const setReplyMessage = useConversationStore(
    (state) => state.setReplyMessage
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClose = () => {
    setIsHovered(false);
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleCancelUpdate = () => {
    setIsUpdate(false);
  };

  const handleReplyMessage = () => {
    setReplyMessage({
      conversationId: params.conversationId as string,
      messageId: message.id,
      userName: message.user?.userName || message.shop?.userName || "",
    });
  };

  useOnClickOutside(updateRef, handleCancelUpdate);

  useOnClickOutside(hoverCardRef, handleClose);

  return (
    <div className="w-full" onMouseLeave={handleMouseLeave}>
      <HoverCard open={isHovered}>
        <HoverCardTrigger asChild>
          <div
            ref={updateRef}
            onMouseEnter={handleMouseEnter}
            className="flex flex-col gap-2"
          >
            {message?.replyMessage ? (
              <MessageReply replyMessage={message.replyMessage} />
            ) : null}

            <div className="flex flex-col rounded-md shadow-md w-full p-2 gap-2 relative bg-background">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[15px]">
                  {message?.user?.userName || message?.shop?.userName}
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {format(message.createdAt, "dd/MM/yyyy H:mm")}
                </span>
              </div>
              {isUpdate ? (
                <UpdateMessage
                  message={message}
                  handleCancelUpdate={handleCancelUpdate}
                />
              ) : (
                <span className="break-all text-sm mr-8">
                  {message?.content}
                </span>
              )}
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="end"
          side="top"
          className={cn(
            "w-max p-1 flex items-center relative gap-1 before:w-full before:top-full before:left-0 before:absolute before:h-5 before:z-10 before:bg-transparent",
            isUpdate ? "hidden" : ""
          )}
          ref={hoverCardRef}
        >
          <Button variant="outline" size="sm">
            <Smile size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReplyMessage}>
            <Reply size={16} />
          </Button>
          {message.shop ? (
            <Button variant="outline" size="sm" onClick={handleUpdate}>
              <Pen size={16} />
            </Button>
          ) : null}
          <MessageOptions message={message} handleUpdate={handleUpdate} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default OptionHover;
