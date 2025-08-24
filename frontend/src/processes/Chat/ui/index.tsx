"use client";

import { FC, useEffect } from "react";
import NewChatView from "@/views/Chat/NewChat";
import ChatView from "@/views/Chat/Chat";
import { useChatStore } from "@/shared/stores/chat";
import { useChatProcess } from "@/shared/hooks/chats/useChatProcess";
import { useAuthMiddleware } from "@/shared/hooks/middlewares/useAuthMiddleware";

interface Props {
  uuid?: string;
}

const ChatProcess: FC<Props> = ({ uuid }) => {
  const { isNewChat } = useChatStore();

  useAuthMiddleware();
  useChatProcess(uuid);

  return isNewChat ? <NewChatView /> : <ChatView />;
};

export default ChatProcess;
