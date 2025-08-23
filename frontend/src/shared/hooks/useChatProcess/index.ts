import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useGetMe } from "@/shared/hooks/useGetMe";
import { useAuthStore } from "@/shared/stores/auth";

export const useChatProcess = (uuid?: string) => {
  const { setChatUuid, setIsNewChat } = useChatStore();

  useEffect(() => {
    if (uuid) {
      setChatUuid(uuid);
      setIsNewChat(false);
    } else {
      setIsNewChat(true);
      setChatUuid("");
    }
  }, [uuid, setChatUuid, setIsNewChat]);

};