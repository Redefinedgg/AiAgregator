"use client";
import ChatResponse from "@/features/Chat/ChatResponse";
import { FC, useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";
import getColumnsCount from "@/shared/helpers/getColumnCount";
import useDistributeResponses from "@/shared/hooks/chats/useDistributeResponses";
import getColumnWidth from "@/shared/helpers/getColumnWidth";
import ChatSelectedResponse from "@/features/Chat/ChatSelectedResponse";
import ChatResizableParts from "@/features/Chat/ChatResizableParts";
import ChatWithoutResponses from "@/features/Chat/ChatWithoutResponses";

const ChatResponses: FC = () => {
  const {
    columnsCount,
    setColumnsCount,
    selectedResponse,
    widthOfSecondPart,
    chatResponses,
  } = useChatStore();
  const { distributeResponses } = useDistributeResponses();

  useEffect(() => {
    const handleResize = () => {
      const newColumnsCount = getColumnsCount({
        isWithSelectedResponse: typeof selectedResponse === "number",
        proccentOfSecondPart: widthOfSecondPart,
      });
      setColumnsCount(newColumnsCount);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setColumnsCount, selectedResponse, widthOfSecondPart, columnsCount]);

  const columns = distributeResponses();
  const columnWidthClass = getColumnWidth(columnsCount);

  return (
    <section className="w-full p-[12px] h-[100%]">
      {chatResponses.length > 0 ? (
        <div className="flex min-h-full max-w-[calc(100%-16px)] ">
          {selectedResponse !== null && (
            <>
              <ChatSelectedResponse />
              <ChatResizableParts />
            </>
          )}
          <div
            className="flex gap-[12px] flex-1"
            style={{
              width: `${widthOfSecondPart}%`,
            }}
          >
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
        </div>
      ) : (
        <ChatWithoutResponses />
      )}
    </section>
  );
};

export default ChatResponses;
