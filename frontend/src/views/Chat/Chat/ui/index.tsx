// components/ChatView.tsx
import { FC } from "react";
import ChatResponses from "@/widgets/Chat/ChatResponses";
import ChatWithoutResponses from "@/widgets/Chat/ChatWithoutResponses";
import { useAutoSendPrompt } from "@/shared/hooks/chats/useAutoSendPrompt";
import { useGetCurrentChat } from "@/shared/hooks/chats/useGetCurrentChat";

const ChatView: FC = () => {
  console.log("chat view")
  const { getCurrentChat } = useGetCurrentChat();

  useAutoSendPrompt();

  const chat = getCurrentChat();

  if (chat) console.log(chat)

  return (
    <section className="w-full p-[12px]">
      {chat?.messages && chat.messages.length > 0 ? (
        <ChatResponses />
      ) : (
        <ChatWithoutResponses />
      )}
    </section>
  );
};

export default ChatView;
