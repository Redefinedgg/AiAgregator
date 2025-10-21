"use client";

import { FC } from "react";
import { useChatStore } from "@/shared/stores/chat";
import ChatSelectedResponseTitle from "@/entities/Chat/ChatSelectedResponseTitle";
import ChatSelectedResponseClose from "@/entities/Chat/ChatSelectedResponseClose";
import ChatSelectedResponseText from "@/entities/Chat/ChatSelectedResponseText";

export const ChatSelectedResponse: FC = () => {
  const { selectedResponse, widthOfFirstPart } = useChatStore();

  if (selectedResponse === null) return null;

  return (
    <div
      className="relative flex flex-col border min-h-[calc(100vh-315px)] border-gray-300 rounded-[24px] flex-shrink-0 ml-[16px]"
      style={{ width: `${widthOfFirstPart}%` }}
    >
      <ChatSelectedResponseTitle />
      <ChatSelectedResponseClose />
      <ChatSelectedResponseText />
    </div>
  );
};

export default ChatSelectedResponse;
