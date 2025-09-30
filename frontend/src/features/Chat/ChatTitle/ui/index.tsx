"use client";

import { useChatStore } from "@/shared/stores/chat";
import EditChatTitleButton from "../../EditChatTitleButton";
import { useFindChatByUuid } from "@/shared/hooks/chats/useFindChatByUuid";
import { useHandleUpdateChatName } from "@/shared/hooks/chats/useHandleUpdateChatName";
import Input from "@/shared/ui/Input";

export default function ChatTitle() {
  const { editingHeader, tempHeaderName, changeTempHeaderName, startEditingHeader, currentChatUuid } = useChatStore();

  const uuid = currentChatUuid;
  if (!uuid) return null;

  const { findChatByUuid } = useFindChatByUuid(uuid);

  const chat = findChatByUuid();
  const name = chat?.name || "New Chat";

  const { handleUpdateChatName } = useHandleUpdateChatName(uuid, true);

  const isEditing = editingHeader === uuid;

  console.log("currentChatUuid:", currentChatUuid);
  console.log("editingUuid:", editingHeader);
  console.log("isEditing:", editingHeader === currentChatUuid);

  return (
    <div className="flex items-center">
      {isEditing ? (
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
      <EditChatTitleButton onClick={() => startEditingHeader(uuid, name || "New Chat")} />
    </div>
  );
}
