// hooks/useChatSender.ts
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useChatStore } from "@/shared/stores/chat";
import { useResponsePlaceholders } from "@/shared/hooks/chats/useResponsePlaceholders";
import { useModelResponses } from "@/shared/hooks/chats/useModelResponses";

export const useChatSender = () => {
  const {
    promptWithoutResponse,
    setPromptWithoutResponse,
    setChatResponses,
    selectedModels,
  } = useChatStore();

  const { createResponsePlaceholders } = useResponsePlaceholders();
  const { fetchModelResponses } = useModelResponses();
  const sendingRef = useRef(false);

  const validateModels = useCallback(() => {
    const validModels = selectedModels.filter(
      selectedModel => selectedModel && selectedModel.model
    );
    
    if (validModels.length === 0) {
      console.warn("No valid models selected");
      toast.error("No valid models selected");
      return null;
    }
    
    return validModels;
  }, [selectedModels]);

  const sendPrompts = useCallback(async (prompt: string) => {
    if (sendingRef.current) {
      console.warn("Already sending a prompt");
      return;
    }

    sendingRef.current = true;

    try {
      setChatResponses([]);

      const validModels = validateModels();
      if (!validModels) {
        return;
      }

      // Create response placeholders
      const placeholders = createResponsePlaceholders(validModels);
      setChatResponses(placeholders);

      // Fetch model responses
      await fetchModelResponses({
        prompt,
        models: validModels,
        placeholders,
      });

    } catch (error) {
      console.error("Error sending prompts:", error);
      toast.error("Failed to send prompts");
    } finally {
      sendingRef.current = false;
    }
  }, [
    validateModels,
    setChatResponses,
    createResponsePlaceholders,
    fetchModelResponses,
  ]);

  return {
    sendPrompts,
    isSending: sendingRef.current,
    hasPromptToSend: Boolean(promptWithoutResponse),
    clearPrompt: () => setPromptWithoutResponse(""),
  };
};