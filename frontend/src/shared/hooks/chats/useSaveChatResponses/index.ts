import { createNewMessages } from "@/shared/api/messages/requests";
import { CreateMessageDto } from "@/shared/api/messages/types";
import { useChatStore } from "@/shared/stores/chat"

export const useSaveChatResponses = () => {
  try {
    const { chatResponses, currentChatUuid } = useChatStore();

    if (!currentChatUuid) {
      throw new Error("Current chat uuid is null");
    }

    const saveChatResponses = async () => {
      const messagesToSave: CreateMessageDto[] = chatResponses.map((message) => {
        return {
          model: message.model,
          response: message.response,
          spent: message.spent,
          timeOfResponse: message.timeOfResponse,
        }
      });


      await createNewMessages({ messages: messagesToSave, chatUuid: currentChatUuid });
    }

    return { saveChatResponses }
  } catch (err) {
    throw err;
  }
}
