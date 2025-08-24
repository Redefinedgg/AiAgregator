"use client";
import ChatResponse from "@/features/Chat/ChatResponse";
import { FC, useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";
import getColumnsCount from "@/shared/helpers/getColumnCount";
import useDistributeResponses from "@/shared/hooks/chats/useDistributeResponses";
import getColumnWidth from "@/shared/helpers/getColumnWidth";

const ChatResponses: FC = () => {
  const { columnsCount, setColumnsCount } = useChatStore();
  const { distributeResponses } = useDistributeResponses();

  useEffect(() => {
    const handleResize = () => {
      setColumnsCount(getColumnsCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setColumnsCount]);

  const columns = distributeResponses();
  const columnWidthClass = getColumnWidth(columnsCount);

  return (
    <div className="flex gap-3 w-[99%] m-2.5">
      {columns.map((columnResponses, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex flex-col gap-3 relative ${columnWidthClass}`}
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