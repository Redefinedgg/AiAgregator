"use client";

import { useChatStore } from "@/shared/stores/chat";
import EditChatTitleButton from "../../../../entities/Chat/EditChatTitleButton";
import { useGetChatsName } from "@/shared/hooks/chats/useGetChatsName";
import Button from "@/shared/ui/Button";
import { useHandleSmartMerge } from "@/shared/hooks/ai/useHandleSmartMerge";
import ChatTileNameInput from "../../../../entities/ChatTileNameInput";

export default function ChatTitle() {
  const { currentChatUuid, editingHeader, startEditingHeader } = useChatStore();
  const { getChatsName } = useGetChatsName();
  const { handleSmartMerge } = useHandleSmartMerge();

  return (
    <div className="flex items-center gap-[12px] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-[12px]">
          {editingHeader === currentChatUuid ? (
            <ChatTileNameInput />
          ) : (
            <h1 className="block p-2 rounded text-[30px] px-[25px] py-[15px] rounded-[12px]">
              {getChatsName() || "New Chat"}
            </h1>
          )}
          <EditChatTitleButton
            onClick={() => startEditingHeader(getChatsName() || "New Chat")}
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
