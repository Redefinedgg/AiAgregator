"use client";

import ChatItem from "@/features/Sidebar/ChatItem";
import { useChatStore } from "@/shared/stores/chat";
import Chat from "@/shared/types/Chat";
import { v4 as uuid } from "uuid";

export default function ChatList() {
  const { chats } = useChatStore();

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-[20px] font-semibold mb-[8px]">Recents</p>
      {chats.map((chat: Chat) => (
        <ChatItem key={chat.uuid} uuid={chat.uuid} name={chat.name} />
      ))}
    </div>
  );
}
