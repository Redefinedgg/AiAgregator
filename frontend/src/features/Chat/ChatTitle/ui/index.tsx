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
import { Logo } from "@/shared/types/ChatResponse";
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

      if (!chat || chat.smartMerges > 0) {
        toast.error("Chat already smart merged");
        return;
      }

      const response = await smartMerge({
        prompt: oldPrompt,
        model: Model.gemini_2_5_flash,
        messages: chatResponses.map((response) => response.response),
        chatUuid: chat.uuid,
      });

      const newChatResponses = chatResponses.map((response) => ({
        ...response,
      }));

      const smartMergeResponse = {
        id: 43424212321,
        uuid: uuidv4(),
        model: Model.smart_merge,
        number: chat.smartMerges + 1,
        response: response.response,
        spent: 0,
        timeOfResponse: response.durationMs,
        logo: Logo.SMART_MERGE,
      };

      setChatResponses([smartMergeResponse, ...newChatResponses]);

      await createSmartMergeMessage({
        message: smartMergeResponse,
        chatUuid: currentChatUuid,
      });
    } catch (error) {
      toast.error("Smart merge failed");
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
