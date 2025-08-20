import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useGetMe } from "@/shared/hooks/useGetMe";

export const useChatProcess = (uuid?: string) => {
  const { setChatUuid, setIsNewChat } = useChatStore();
  const { me } = useGetMe();

  useEffect(() => {
    me();

    if (uuid) {
      setChatUuid(uuid);
      setIsNewChat(false);
    } else {
      setIsNewChat(true);
      setChatUuid("");
    }
  }, [uuid, me, setChatUuid, setIsNewChat]);
};
