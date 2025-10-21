import ReactMarkdown from "react-markdown";
import { FC } from "react";
import { useChatStore } from "@/shared/stores/chat";

const ChatSelectedResponseText: FC = () => {
  const { selectedResponse, chatResponses } = useChatStore();
  const response = chatResponses.find(
    (r) => r.id === selectedResponse
  )?.response;
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="text-[20px] p-[24px]">
        <div className="prose prose-sm max-w-none h-full p-[8px] overflow-auto">
          <ReactMarkdown className="prose prose-sm max-w-none whitespace-pre-wrap break-words px-[20px]">
            {response || ""}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatSelectedResponseText;
