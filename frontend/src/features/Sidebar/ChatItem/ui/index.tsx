"use client";

import Link from "next/link";
import EditChatTitleButton from "../../../../entities/Chat/EditChatTitleButton";
import { useChatStore } from "@/shared/stores/chat";
import { useHandleUpdateChatName } from "@/shared/hooks/chats/useHandleUpdateChatName";
import Input from "@/shared/ui/Input";

type Props = {
  uuid: string;
  name: string | null;
}

export default function ChatItem({ uuid, name }: Props) {
  const { editingItem, tempItemName, changeTempItemName, startEditingItem } = useChatStore();
  const { handleUpdateChatName } = useHandleUpdateChatName(uuid);

  const isEditing = editingItem === uuid;

  return (
    <div className="flex justify-between items-center">
      {isEditing ? (
        <Input
          value={tempItemName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTempItemName(e.target.value)}
          placeholder="Enter chat name"
          className="text-[20px] w-full"
          onBlur={handleUpdateChatName}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleUpdateChatName()}
          autoFocus
        />
      ) : (
        <Link href={`/chat/${uuid}`} className="block p-2 rounded text-[20px] hover:opacity-90 hover:bg-[#11141C] p-[8px] rounded-[12px]">
          {name || "New Chat"}
        </Link>
      )}
      <EditChatTitleButton onClick={() => startEditingItem(uuid, name || "New Chat")} />
    </div>
  );
}
