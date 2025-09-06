"use client";

import ChatItem from "@/features/Sidebar/ChatItem";
import { useChatStore } from "@/shared/stores/chat";

export default function ChatList() {
  const { chats } = useChatStore();

  return (
    <div className="flex flex-col gap-2 mt-4">
      {chats.map((chat) => (
        <ChatItem key={chat.id} uuid={chat.uuid} name={chat.name} />
      ))}
    </div>
  );
}
