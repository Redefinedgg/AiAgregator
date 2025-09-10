// hooks/useAutoSendPrompt.ts
import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useChatSender } from "@/shared/hooks/chats/useChatSender";
import { useCreateNewChat } from "@/shared/hooks/chats/useCreateNewChat";
import { useSaveChatResponses } from "../useSaveChatResponses";

export const useAutoSendPrompt = () => {
  console.log("auto send prompt")
  const {
    promptWithoutResponse,
    currentChatUuid,
    isProcessingPrompt,
    lastProcessedPrompt,
    setIsProcessingPrompt,
    setLastProcessedPrompt,
  } = useChatStore();

  const { sendPrompts, hasPromptToSend, clearPrompt } = useChatSender();
  const { createNewChat } = useCreateNewChat();
  const { saveChatResponses } = useSaveChatResponses();

  useEffect(() => {
    const shouldProcess = (
      hasPromptToSend &&
      !isProcessingPrompt &&
      promptWithoutResponse !== lastProcessedPrompt &&
      promptWithoutResponse.trim() !== ""
    );

    if (shouldProcess) {
      const handleSendPrompts = async () => {
        if (!currentChatUuid) {
          return;
        }

        setIsProcessingPrompt(true);
        setLastProcessedPrompt(promptWithoutResponse);

        try {
          const chat = await createNewChat(currentChatUuid);
          await sendPrompts(promptWithoutResponse);
          await saveChatResponses(chat.uuid);
          clearPrompt();
        } catch (error) {
          console.error("Error in auto send prompt:", error);
          setLastProcessedPrompt("");
        } finally {
          setIsProcessingPrompt(false);
        }
      };

      handleSendPrompts();
    }
  }, [
    hasPromptToSend,
    promptWithoutResponse,
    isProcessingPrompt,
    lastProcessedPrompt,
    currentChatUuid,
    sendPrompts,
    clearPrompt,
    createNewChat,
    saveChatResponses,
    setIsProcessingPrompt,
    setLastProcessedPrompt,
  ]);
};
