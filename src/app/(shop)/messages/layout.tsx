import React from "react";
import ListConversation from "./_components/ListConversation";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen fixed top-0 pt-16 left-0 w-full">
      <ListConversation />
      {children}
    </div>
  );
};

export default MessagesLayout;
