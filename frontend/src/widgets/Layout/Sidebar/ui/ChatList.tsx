"use client";

import ChatItem from "@/features/Sidebar/ChatItem";
import { useChatStore } from "@/shared/stores/chat";

export default function ChatList() {
  const { chats } = useChatStore();

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-[20px] font-semibold mb-[8px]">Recents</p>
      {chats.map((chat) => (
        <ChatItem key={chat.id} uuid={chat.uuid} name={chat.name} />
      ))}
    </div>
  );
}
