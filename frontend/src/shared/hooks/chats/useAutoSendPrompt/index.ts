import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useChatSender } from "@/shared/hooks/chats/useChatSender";
import { useCreateNewChat } from "@/shared/hooks/chats/useCreateNewChat";
import { useSetDelayCreateChat } from "@/shared/hooks/chats/useSetDelayCreateChat";
  
export const useAutoSendPrompt = () => {
  const { promptWithoutResponse, currentChatUuid } = useChatStore();
  const { sendPrompts, hasPromptToSend, clearPrompt } = useChatSender();
  const { createNewChat } = useCreateNewChat();
  const { setDelayCreateChat } = useSetDelayCreateChat();

  useEffect(() => {
    if (hasPromptToSend) {
      const handleSendPrompts = async () => {
        if (!currentChatUuid) return;
        await sendPrompts(promptWithoutResponse);
        setDelayCreateChat();
        await createNewChat(currentChatUuid);
        clearPrompt();
      };
      handleSendPrompts();
    }
  }, [
    hasPromptToSend,
    promptWithoutResponse,
    sendPrompts,
    clearPrompt,
    currentChatUuid,
  ]);
};
