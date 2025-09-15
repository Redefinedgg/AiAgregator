// useCheckAlreadyExistingChat/index.ts
import { useChatStore } from "@/shared/stores/chat";
import { useAuthStore } from "@/shared/stores/auth";
import { getChatByUuid as getChatByUuidRequest } from "@/shared/api/chats/requests";
import { useEffect, useCallback } from "react";
import { useGetMessagesByUuid } from "../useGetMessagesByUuid";

export const useCheckAlreadyExistingChat = () => {
  const { currentChatUuid, setAlreadyExistingUuids, alreadyExistingUuids } =
    useChatStore();
  const { user } = useAuthStore();
  const { getMessagesByUuid } = useGetMessagesByUuid();

  const getChatByUuid = useCallback(async (uuid: string) => {
    const chat = await getChatByUuidRequest(uuid);
    return chat;
  }, []);

  useEffect(() => {
    const checkChat = async () => {
      if (!currentChatUuid || !user) return;
      await getChatByUuid(currentChatUuid);
      if (!alreadyExistingUuids.includes(currentChatUuid)) {
        setAlreadyExistingUuids([...alreadyExistingUuids, currentChatUuid]);
      }
      await getMessagesByUuid();
    };
    checkChat();
  }, [currentChatUuid, user?.uuid, alreadyExistingUuids]);

  return { getChatByUuid, getMessagesByUuid };
};
