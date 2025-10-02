import { useChatStore } from "@/shared/stores/chat";

export const useFindChatByUuid = (uuid: string) => {
  const { chats } = useChatStore();

  const findChatByUuid = () => {
    return chats.find(chat => chat.uuid === uuid);
  }

  return { findChatByUuid }
};
