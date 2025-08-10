"use client";

import ChatResponse from "@/features/ChatResponse";
import { FC, useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { chatResponses as chatResponsesConstant } from "@/shared/constants/ChatResponses";
import React from "react";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";

const ChatResponses: FC = () => {
  const { chatResponses, setChatResponses } = useChatStore();

  useEffect(() => {
    setChatResponses(chatResponsesConstant);
  }, []);

  // Группируем ответы по колонкам
  const getColumnsCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 2470) return 6; // Desktop large
      else if (window.innerWidth >= 2070) return 5; // Desktop
      else if (window.innerWidth >= 1680) return 4;  // Tablet
      else if (window.innerWidth >= 1280) return 3;  // Small tablet
      else if (window.innerWidth >= 1024) return 2;  // Tablet
      else return 1; // Mobile
    }
    return 5; // Default
  };

  const [columnsCount, setColumnsCount] = React.useState(getColumnsCount);

  React.useEffect(() => {
    const handleResize = () => {
      setColumnsCount(getColumnsCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Распределяем ответы по колонкам
  const distributeResponses = () => {
    const columns: ChatResponseType[][] = Array.from({ length: columnsCount }, () => []);
    
    chatResponses.forEach((response: ChatResponseType, index: number) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(response);
    });
  
    return columns;
  };

  const columns = distributeResponses();

  return (
    <div className="flex gap-[12px] w-full">
      {columns.map((columnResponses, columnIndex) => (
        <div 
          key={columnIndex} 
          className={`flex flex-col gap-[12px] relative ${
            columnsCount === 1 ? 'w-full' : 
            columnsCount === 2 ? 'w-1/2' :
            columnsCount === 3 ? 'w-1/3' :
            columnsCount === 4 ? 'w-1/4' :
            columnsCount === 5 ? 'w-1/5' :
            'w-1/6'
          }`}
        >
          {columnResponses.map((response: ChatResponseType) => (
            <ChatResponse key={response.id} id={response.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatResponses;