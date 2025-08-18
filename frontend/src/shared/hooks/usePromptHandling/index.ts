// features/chat/lib/hooks/usePromptHandling.ts
import { useChatStore } from "@/shared/stores/chat";

export const usePromptHandling = () => {
  const { setPromptWithoutResponse, setChatResponses, updateChatResponse } =
    useChatStore();
  const handlePromptSending = () => {};

  return { handlePromptSending };
};
