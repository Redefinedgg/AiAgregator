"use client";

import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";
import { FC, useEffect, useState } from "react";
import ChatResponseTitle from "@/entities/ChatResponseTitle";
import { useChatStore } from "@/shared/stores/chat";

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
      <ChatResponseTitle id={chatResponse?.id} />
      <div className="flex-1 text-gray-700 text-sm leading-relaxed overflow-y-auto relative">
        <div className="h-full text-gray-700">
          <div className="prose prose-sm max-w-none h-full">
            <div className="p-[16px] overflow-auto h-full">
                {chatResponse?.response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;