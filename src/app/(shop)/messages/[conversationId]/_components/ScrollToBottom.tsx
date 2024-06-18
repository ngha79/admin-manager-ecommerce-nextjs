"use client";

import React, { useRef, useEffect } from "react";

function ChatComponent() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, []);

  return <div ref={messagesEndRef} />;
}

export default ChatComponent;
