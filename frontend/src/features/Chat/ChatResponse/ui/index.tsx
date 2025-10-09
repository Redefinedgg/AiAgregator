"use client";

import { FC, useEffect, useState } from "react";
import ChatResponseTitle from "@/entities/Chat/ChatResponseTitle";
import { useChatStore } from "@/shared/stores/chat";
import ChatResponseText from "@/entities/Chat/ChatResponseText";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";

interface Props {
  id: number | undefined;
}

const ChatResponse: FC<Props> = ({ id }) => {
  const {
    chatResponses,
    getOneChatResponse,
    setSelectedResponse,
    selectedResponse,
  } = useChatStore();
  const [chatResponse, setChatResponse] = useState<
    ChatResponseType | undefined | null
  >(null);

  useEffect(() => {
    const response = getOneChatResponse(id);
    setChatResponse(response);
  }, [chatResponses, id]);

  if (!chatResponse) return null;

  return (
    <div
      className="border border-gray-300 rounded-[12px] bg-white shadow-sm max-h-[300px] flex flex-col hover:shadow-md transition-all cursor-pointer "
      onClick={() => {
        setSelectedResponse(typeof id === "number" ? id : null);
        console.log(selectedResponse);
      }}
    >
      <ChatResponseTitle id={id} />
      <ChatResponseText response={chatResponse.response} />
    </div>
  );
};

export default ChatResponse;
