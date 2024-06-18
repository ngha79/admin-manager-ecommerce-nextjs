import React from "react";
import Header from "./Header";
import Messages from "./Messages";
import CreateMessage from "./CreateMessage";
import { IConversation } from "@/types/conversations";

const ConversationLayout = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  return (
    <div className="flex flex-col flex-1 relative">
      <Header conversation={conversation} />
      <div className="flex-1 overflow-y-auto">
        <Messages conversation={conversation} />
      </div>
      <CreateMessage conversation={conversation} />
    </div>
  );
};

export default ConversationLayout;
