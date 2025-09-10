import { useChatStore } from "@/shared/stores/chat"
import { useFindChatByUuid } from "../useFindChatByUuid";

export const useGetCurrentChat = () => {
  try {
    const { currentChatUuid } = useChatStore();
    const { findChatByUuid } = useFindChatByUuid();

    if (!currentChatUuid) throw new Error("chatUuid is null");

    const getCurrentChat = () => {
      return findChatByUuid(currentChatUuid);
    }

    return { getCurrentChat }
  } catch (err) {
    throw err;
  }
}
