// components/ChatView.tsx
import { FC } from "react";
import ChatResponses from "@/widgets/Chat/ChatResponses";
import ChatWithoutResponses from "@/widgets/Chat/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { useAutoSendPrompt } from "@/shared/hooks/chats/useAutoSendPrompt";
import { useCheckAlreadyExistingChat } from "@/shared/hooks/chats/useCheckAlreadyExistingChat";
import { useEffect } from "react";

const ChatView: FC = () => {
  const { chatResponses } = useChatStore();

  useCheckAlreadyExistingChat();
  useAutoSendPrompt();

  return (
    <section className="w-full p-[12px]">
      {chatResponses.length > 0 ? <ChatResponses /> : <ChatWithoutResponses />}
    </section>
  );
};

export default ChatView;
