import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse } from "@/shared/types/ChatResponse";

export const useDistributeResponses = () => {
  const { chatResponses, columnsCount } = useChatStore();

  const distributeResponses = () => {
    const columns: ChatResponse[][] = Array.from(
      { length: columnsCount },
      () => []
    );

    chatResponses.forEach((response: ChatResponse, index: number) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(response);
    });

    return columns;
  };

  return { distributeResponses };
};

export default useDistributeResponses;
