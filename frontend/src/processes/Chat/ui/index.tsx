"use client";

import { FC, useEffect } from "react";
import NewChatView from "@/views/Chat/NewChat";
import ChatView from "@/views/Chat/Chat";
import { useChatStore } from "@/shared/stores/chat";
import { useChatProcess } from "@/shared/hooks/useChatProcess";
import { useGetMe } from "@/shared/hooks/useGetMe";

interface Props {
  uuid?: string;
}

const ChatProcess: FC<Props> = ({ uuid }) => {
  const { isNewChat } = useChatStore();

  useChatProcess(uuid);

  return isNewChat ? <NewChatView /> : <ChatView />;
};

export default ChatProcess;
