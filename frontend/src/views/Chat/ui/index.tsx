import { FC } from "react";
import ChatResponses from "@/widgets/ChatResponses";

const ChatView: FC = () => {
  return (
    <section className="w-full">
      <ChatResponses />
    </section>
  );
};

export default ChatView;