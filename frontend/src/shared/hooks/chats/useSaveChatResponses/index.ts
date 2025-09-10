import { createNewMessages } from "@/shared/api/messages/requests";
import { CreateMessageDto } from "@/shared/api/messages/types";
import { useChatStore } from "@/shared/stores/chat"
import { usePushChatMessages } from "../usePushChatMessages";

export const useSaveChatResponses = () => {
  try {
    const { chatResponses } = useChatStore();
    const { pushChatMessages } = usePushChatMessages();

    const saveChatResponses = async (chatUuid: string) => {
      console.log("save chat responses start")
      const messagesToSave: CreateMessageDto[] = chatResponses.map((message) => {
        return {
          model: message.model,
          response: message.response,
          spent: message.spent,
          timeOfResponse: message.timeOfResponse,
        }
      });


      const { messages } = await createNewMessages({ messages: messagesToSave, chatUuid: chatUuid });

      pushChatMessages(chatUuid, messages);

      console.log("save chat responses finish")
    }

    return { saveChatResponses }
  } catch (err) {
    throw err;
  }
}
