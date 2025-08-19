"use client";

import { useChatStore } from "@/shared/stores/chat";
import { FC, useEffect } from "react";
import NewChatView from "@/views/Chat/NewChat";
import ChatView from "@/views/Chat/Chat";

interface Props {
  uuid?: string;
}

const ChatProcess: FC<Props> = ({ uuid }: Props) => {
  const { isNewChat, setChatUuid, setIsNewChat } = useChatStore();

  useEffect(() => {
    if (uuid) {
      setChatUuid(uuid);
      setIsNewChat(false);
    } else {
      setIsNewChat(true);
      setChatUuid("");
    }
  }, []);

  return isNewChat ? <NewChatView /> : <ChatView />
};

export default ChatProcess;
