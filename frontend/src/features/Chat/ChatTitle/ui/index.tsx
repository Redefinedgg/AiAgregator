"use client";

import { useChatStore } from "@/shared/stores/chat";
import EditChatTitleButton from "../../../../entities/Chat/EditChatTitleButton";
import { useHandleUpdateChatName } from "@/shared/hooks/chats/useHandleUpdateChatName";
import Input from "@/shared/ui/Input";
import { useGetChatsName } from "@/shared/hooks/chats/useGetChatsName";
import Button from "@/shared/ui/Button";
import { smartMerge } from "@/shared/api/ai/requests";
import { Model } from "@/shared/api/ai/enums";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ChatResponse, Logo } from "@/shared/types/ChatResponse";
import { createSmartMergeMessage } from "@/shared/api/messages/requests";

export default function ChatTitle() {
  const {
    currentChatUuid,
    editingHeader,
    tempHeaderName,
    changeTempHeaderName,
    startEditingHeader,
    chatResponses,
    oldPrompt,
    chats,
    setChats,
    setChatResponses,
  } = useChatStore();
  const { handleUpdateChatName } = useHandleUpdateChatName(undefined, true);
  const { getChatsName } = useGetChatsName();

  const name = getChatsName();

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
        model: Model.gemini_2_5_flash,
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
        model: Model.gemini_2_5_flash,
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

  return (
    <div className="flex items-center gap-[12px] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-[12px]">
          {editingHeader === currentChatUuid ? (
            <Input
              value={tempHeaderName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTempHeaderName(e.target.value)
              }
              placeholder="Enter chat name"
              className="text-[30px] w-full"
              onBlur={handleUpdateChatName}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleUpdateChatName()
              }
              autoFocus
            />
          ) : (
            <h1 className="block p-2 rounded text-[30px] px-[25px] py-[15px] rounded-[12px]">
              {name || "New Chat"}
            </h1>
          )}
          <EditChatTitleButton
            onClick={() => startEditingHeader(name || "New Chat")}
          />
        </div>
        <div className="flex items-center gap-[12px]">
          <Button
            onClick={handleSmartMerge}
            label="Smart merge"
            className="text-[24px] mr-[25px]"
            title="Absolutely free"
          />
        </div>
      </div>
    </div>
  );
}
