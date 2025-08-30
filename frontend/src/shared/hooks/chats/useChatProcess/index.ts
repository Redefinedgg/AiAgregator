import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";

export const useChatProcess = (uuid?: string) => {
  const { setCurrentChatUuid, setIsNewChat, currentChatUuid } = useChatStore();

  useEffect(() => {
    console.log(1, uuid);
    if (uuid) {
      setCurrentChatUuid(uuid);
      console.log(2, currentChatUuid);
      setIsNewChat(false);
    } else {
      setIsNewChat(true);
      setCurrentChatUuid(null);
    }
  }, [uuid]);

};