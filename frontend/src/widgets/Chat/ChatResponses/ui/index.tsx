"use client";
import ChatResponse from "@/features/Chat/ChatResponse";
import { FC, useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";
import getColumnsCount from "@/shared/helpers/getColumnCount";
import useDistributeResponses from "@/shared/hooks/chats/useDistributeResponses";
import getColumnWidth from "@/shared/helpers/getColumnWidth";

const ChatResponses: FC = () => {
  const { columnsCount, setColumnsCount, chatResponses } = useChatStore();
  const { distributeResponses } = useDistributeResponses();

  useEffect(() => {
    const handleResize = () => {
      const newColumnsCount = getColumnsCount();
      setColumnsCount(newColumnsCount);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setColumnsCount]);

  const columns = distributeResponses();

  const columnWidthClass = getColumnWidth(columnsCount);

  return (
    <div className="flex gap-[12px] w-[99%] m-[12px]">
      {columns.map((columnResponses, columnIndex) => {
        return (
          <div
            key={columnIndex}
            className={`flex flex-col gap-[12px] relative ${columnWidthClass}`}
          >
            {columnResponses.map(
              (response: ChatResponseType, responseIndex) => {
                return (
                  <ChatResponse
                    key={`${response.id}-${columnIndex}-${responseIndex}`}
                    id={response.id}
                  />
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatResponses;
