import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useChatSender } from "@/shared/hooks/chats/useChatSender";
import { useCreateNewChat } from "@/shared/hooks/chats/useCreateNewChat";

export const useAutoSendPrompt = () => {
  const { promptWithoutResponse } = useChatStore();
  const { sendPrompts, hasPromptToSend, clearPrompt } = useChatSender();
  const { createNewChat } = useCreateNewChat();

  useEffect(() => {
    if (hasPromptToSend) {
      const handleSendPrompts = async () => {
        await sendPrompts(promptWithoutResponse);
        await createNewChat();
        clearPrompt();
      };
      handleSendPrompts();
    }
  }, [hasPromptToSend, promptWithoutResponse, sendPrompts, clearPrompt]);
};
