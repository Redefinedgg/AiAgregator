import { Model } from "@/shared/api/ai/enums";
import { smartMerge } from "@/shared/api/ai/requests";
import { createSmartMergeMessage } from "@/shared/api/messages/requests";
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse, Logo } from "@/shared/types/ChatResponse";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const useHandleSmartMerge = () => {
  const {
    currentChatUuid,
    chats,
    setChats,
    chatResponses,
    oldPrompt,
    setChatResponses,
  } = useChatStore();

  const handleSmartMerge = async () => {
    try {
      if (!currentChatUuid) {
        toast.error("No chat UUID");
        return;
      }

      const chat = chats.find((chat) => chat.uuid === currentChatUuid);

      if (!chat) {
        toast.error("Chat not found");
        return;
      }

      if (chat.smartMerges > 0) {
        toast.error("Chat already smart merged");
        return;
      }

      // Проверка наличия сообщений для мержа
      if (!chatResponses || chatResponses.length === 0) {
        toast.error("No messages to merge");
        return;
      }

      // Проверка наличия промпта
      if (!oldPrompt) {
        toast.error("No prompt available");
        return;
      }

      const updatedChat = {
        ...chat,
        smartMerges: chat.smartMerges + 1,
      };

      const updatedChats = chats.map((c) =>
        c.uuid === chat.uuid ? updatedChat : c
      );

      setChats(updatedChats);

      let responsePlaceholder: ChatResponse = {
        id: Date.now(),
        model: Model.smart_merge,
        number: chat.smartMerges + 1,
        timeOfResponse: "",
        logo: Logo.SMART_MERGE,
        response: "Wait for response...",
        spent: 0,
        uuid: uuidv4(),
      };

      setChatResponses([responsePlaceholder, ...chatResponses]);

      const response = await smartMerge({
        prompt: oldPrompt,
        model: Model.smart_merge,
        messages: chatResponses.map((response) => response.response),
        chatUuid: chat.uuid,
        number: chat.smartMerges + 1,
      });

      // Проверка ответа от API
      if (!response || !response.response) {
        toast.error("Invalid response from smart merge");
        return;
      }

      responsePlaceholder = {
        id: Date.now(),
        uuid: uuidv4(),
        model: Model.smart_merge,
        number: chat.smartMerges + 1,
        response: response.response,
        spent: 0,
        timeOfResponse: String(response.durationMs || 0), // Конвертируем в строку
        logo: Logo.SMART_MERGE,
      };

      // Добавляем smart merge в начало списка
      setChatResponses([responsePlaceholder, ...chatResponses]);

      await createSmartMergeMessage({
        message: {
          model: Model.smart_merge,
          response: response.response,
          spent: 0,
          timeOfResponse: String(response.durationMs || 0),
          number: chat.smartMerges + 1,
        },
        chatUuid: currentChatUuid,
      });

      toast.success("Smart merge completed successfully");
    } catch (error) {
      console.error("Smart merge error:", error);
      toast.error(
        error instanceof Error ? error.message : "Smart merge failed"
      );
    }
  };

  return {
    handleSmartMerge,
  };
};
