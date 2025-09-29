import { useChatStore } from "@/shared/stores/chat";

export const useFindChatByUuid = (uuid: string) => {
  const { chats } = useChatStore();

  const findChatByUuid = () => {
    return chats.filter(chat => chat.uuid === uuid)[0];
  }

  return { findChatByUuid }
};
