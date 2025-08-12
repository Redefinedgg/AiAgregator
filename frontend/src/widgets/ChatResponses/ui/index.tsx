"use client";

import { FC, useEffect } from "react";
import ChatResponse from "@/features/ChatResponse";
import { useChatStore } from "@/shared/stores/chat";
import { getColumnsCount } from "@/shared/helpers/getColumnCount";
import { distributeResponses } from "@/shared/helpers/distributeResponses";
import { useScreenStore } from "@/shared/stores/screen";

const ChatResponses: FC = () => {
  const { chatResponses, columnsCount, setColumnsCount } = useChatStore();
  const { width } = useScreenStore()

  // Обновляем количество колонок при изменении ширины
  useEffect(() => {
    setColumnsCount(getColumnsCount(width));
  }, [width, setColumnsCount]);

  const columns = distributeResponses(chatResponses, columnsCount);

  return (
    <div className="flex gap-3 w-full m-2.5">
      {columns.map((columnResponses, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex flex-col gap-3 relative w-1/${columnsCount}`}
        >
          {columnResponses.map((response) => (
            <ChatResponse key={response.id} id={response.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatResponses;
