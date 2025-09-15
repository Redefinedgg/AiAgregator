import { createNewMessages } from "@/shared/api/messages/requests";
import { useChatStore } from "@/shared/stores/chat";

export const useCreateMessagesInChat = () => {
  const { currentChatUuid, chatResponses } = useChatStore();

  const createMessagesInChat = async () => {
    try {
      const response = await createNewMessages({
        messages: chatResponses,
        chatUuid: currentChatUuid,
      });
      return response;
    } catch (err) {
      console.error("failed to create messages in chat");
    }
  };

  return { createMessagesInChat };
};
