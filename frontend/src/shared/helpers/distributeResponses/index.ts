import { ChatResponse } from "@/shared/types/ChatResponse";

export const distributeResponses = (chatResponses: ChatResponse[], columnsCount: number) => {
    const columns: ChatResponse[][] = Array.from({ length: columnsCount }, () => []);
    
    chatResponses.forEach((response: ChatResponse, index: number) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(response);
    });
  
    return columns;
  };