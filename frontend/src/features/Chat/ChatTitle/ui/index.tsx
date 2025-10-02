"use client";

import { useChatStore } from "@/shared/stores/chat";
import EditChatTitleButton from "../../EditChatTitleButton";
import { useHandleUpdateChatName } from "@/shared/hooks/chats/useHandleUpdateChatName";
import Input from "@/shared/ui/Input";
import { useGetChatsName } from "@/shared/hooks/chats/useGetChatsName";

export default function ChatTitle() {
  const { currentChatUuid, editingHeader, tempHeaderName, changeTempHeaderName, startEditingHeader } = useChatStore();
  const { handleUpdateChatName } = useHandleUpdateChatName(undefined, true);
  const { getChatsName } = useGetChatsName();

  const name = getChatsName();

  return (
    <div className="flex items-center">
      {editingHeader === currentChatUuid ? (
        <Input
          value={tempHeaderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTempHeaderName(e.target.value)}
          placeholder="Enter chat name"
          className="text-[30px] w-full"
          onBlur={handleUpdateChatName}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleUpdateChatName()}
          autoFocus
        />
      ) : (
        <h1 className="block p-2 rounded text-[30px] px-[25px] py-[15px] rounded-[12px]">
          {name || "New Chat"}
        </h1>
      )}
      <EditChatTitleButton onClick={() => startEditingHeader(name || "New Chat")} />
    </div>
  );
}
