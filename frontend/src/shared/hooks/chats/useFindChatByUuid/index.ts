import { useChatStore } from "@/shared/stores/chat"

export const useFindChatByUuid = () => {
  const { chats } = useChatStore();

  const findChatByUuid = (chatUuid: string) => {
    return chats.find((chat) => chat.uuid === chatUuid);
  }

  return { findChatByUuid }
}
