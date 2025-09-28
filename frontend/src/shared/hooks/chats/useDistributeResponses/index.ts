// shared/hooks/chats/useDistributeResponses.ts (с логами)
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse } from "@/shared/types/ChatResponse";

const useDistributeResponses = () => {
  const { chatResponses, columnsCount } = useChatStore();

  const distributeResponses = () => {
    if (!chatResponses.length) {
      return [];
    }

    const columns: ChatResponse[][] = Array.from({ length: columnsCount }, () => []);

    chatResponses.forEach((response: ChatResponse, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(response);
    });

    return columns;
  };

  return { distributeResponses };
};

export default useDistributeResponses;