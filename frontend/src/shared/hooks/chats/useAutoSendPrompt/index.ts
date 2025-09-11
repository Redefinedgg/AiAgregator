// hooks/useAutoSendPrompt.ts
import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useChatSender } from "@/shared/hooks/chats/useChatSender";
import { useCreateNewChat } from "@/shared/hooks/chats/useCreateNewChat";
import { useCreateMessagesInChat } from "@/shared/hooks/chats/useCreateMessagesInChat";
import { toast } from "react-toastify";

export const useAutoSendPrompt = () => {
  const {
    promptWithoutResponse,
    currentChatUuid,
    isProcessingPrompt,
    lastProcessedPrompt,
    setIsProcessingPrompt,
    setLastProcessedPrompt,
    alreadyExistingUuids,
  } = useChatStore();

  const { sendPrompts, hasPromptToSend, clearPrompt } = useChatSender();
  const { createNewChat } = useCreateNewChat();
  const { createMessagesInChat } = useCreateMessagesInChat();

  useEffect(() => {
    const shouldProcess = (
      hasPromptToSend &&
      !isProcessingPrompt &&
      promptWithoutResponse !== lastProcessedPrompt &&
      promptWithoutResponse.trim() !== "" &&
      !alreadyExistingUuids.includes(currentChatUuid!)
    );

    if (shouldProcess) {
      const handleSendPrompts = async () => {
        if (!currentChatUuid) {
          return;
        }

        setIsProcessingPrompt(true);
        setLastProcessedPrompt(promptWithoutResponse);

        try {
          await sendPrompts(promptWithoutResponse);
          await createNewChat(currentChatUuid);
          await createMessagesInChat();
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
    setIsProcessingPrompt,
    setLastProcessedPrompt,
  ]);
};
