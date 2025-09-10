import { useChatStore } from "@/shared/stores/chat"
import Message from "@/shared/types/Message"
import { useFindChatByUuid } from "../useFindChatByUuid";

export const usePushChatMessages = () => {
  try {
    const { setChatMessages, nowDelayted } = useChatStore();
    const { findChatByUuid } = useFindChatByUuid();

    const pushChatMessages = (chatUuid: string, newMessages: Message[]) => {
      const chat = findChatByUuid(chatUuid);
      if (!chat) throw new Error("chat not found");

      if (nowDelayted) return;

      console.log("push chat messages start")

      const updatedMessages = [...chat.messages, ...newMessages]
      setChatMessages(chatUuid, updatedMessages);
      console.log("push chat messages finish")
    }

    return { pushChatMessages }
  } catch (err) {
    throw err;
  }
}
