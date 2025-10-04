"use client";

import { FC, useEffect, useState } from "react";
import ChatResponseTitle from "@/entities/ChatResponseTitle";
import { useChatStore } from "@/shared/stores/chat";
import ReactMarkdown from "react-markdown";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";

interface Props {
  id: number | undefined;
}

const ChatResponse: FC<Props> = ({ id }) => {
  const { chatResponses, getOneChatResponse } = useChatStore();
  const [chatResponse, setChatResponse] = useState<
    ChatResponseType | undefined | null
  >(null);

  useEffect(() => {
    const response = getOneChatResponse(id);
    setChatResponse(response);
  }, [chatResponses, id]);

  if (!chatResponse) return null;
  return (
    <div className="border border-gray-300 rounded-[12px] bg-white shadow-sm max-h-[300px] flex flex-col hover:shadow-md transition-all cursor-pointer">
      <ChatResponseTitle id={id} />
      <div className="flex-1 text-gray-700 text-sm leading-relaxed overflow-y-auto relative">
        <div className="h-full text-gray-700">
          <div className="prose prose-sm max-w-none h-full p-[8px] overflow-auto">
            <ReactMarkdown
              className="prose prose-sm max-w-none whitespace-pre-wrap break-words px-[20px]"
            >
              {chatResponse?.response || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;
