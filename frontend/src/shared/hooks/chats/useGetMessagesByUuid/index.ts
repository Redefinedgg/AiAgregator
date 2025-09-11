// useGetMessagesByUuid/index.ts
import { getChatMessagesByChatUuid } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat";
import { useCallback } from "react";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";

export const useGetMessagesByUuid = () => {
  const { setChatResponses, currentChatUuid } = useChatStore();

  const getMessagesByUuid = useCallback(
    async () => {
      try {
        if (!currentChatUuid) return;
        const messages = await getChatMessagesByChatUuid(currentChatUuid);
        console.log(messages);
        const filteredMessages = messages.messages.map((message: any) => {
          return {
            id: message.id,
            model: message.model,
              number: message.id,
              response: message.response,
              spent: message.spent,
              timeOfResponse: message.timeOfResponse,
              logo: getLogoFromModel(message.model),
            };
          });
          console.log("filteredMessages", filteredMessages);
        setChatResponses(filteredMessages);
        return filteredMessages;
      } catch (err) {
        console.error("failed to get messages by UUID");
      }
    },
    [setChatResponses, currentChatUuid]
  );

  return { getMessagesByUuid };
};
