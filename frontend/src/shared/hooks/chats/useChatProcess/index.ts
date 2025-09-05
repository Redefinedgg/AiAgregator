import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";

export const useChatProcess = (uuid?: string) => {
  const { setCurrentChatUuid, setIsNewChat, currentChatUuid } = useChatStore();

  useEffect(() => {
    if (uuid) {
      setCurrentChatUuid(uuid);
      setIsNewChat(false);
    } else {
      setIsNewChat(true);
      setCurrentChatUuid(null);
    }
  }, [uuid]);

};