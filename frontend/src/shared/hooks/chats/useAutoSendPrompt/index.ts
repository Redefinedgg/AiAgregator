// hooks/useAutoSendPrompt.ts
import { useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";
import { useChatSender } from "@/shared/hooks/chats/useChatSender";
import { useCreateNewChat } from "@/shared/hooks/chats/useCreateNewChat";
 
export const useAutoSendPrompt = () => {
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
          console.log("No current chat UUID");
          return;
        }
        
        console.log("Starting auto send prompt process");
        setIsProcessingPrompt(true);
        setLastProcessedPrompt(promptWithoutResponse);
        
        try {
          await sendPrompts(promptWithoutResponse);
          await createNewChat(currentChatUuid);
          clearPrompt();
          console.log("Auto send prompt completed successfully");
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