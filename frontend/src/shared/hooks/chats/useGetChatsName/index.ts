import { useChatStore } from "@/shared/stores/chat";
import { useFindChatByUuid } from "../useFindChatByUuid"

export const useGetChatsName = () => {
  const { currentChatUuid } = useChatStore();
  const { findChatByUuid } = useFindChatByUuid(currentChatUuid || "");

  const getChatsName = (): string => {
    const chat = findChatByUuid();
    return chat?.name || "New Chat";
  }

  return { getChatsName };
}
