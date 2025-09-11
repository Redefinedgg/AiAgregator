// hooks/useChatSender.ts
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useChatStore } from "@/shared/stores/chat";
import { useResponsePlaceholders } from "@/shared/hooks/chats/useResponsePlaceholders";
import { useModelResponses } from "@/shared/hooks/chats/useModelResponses";
import { useValidateModels } from "@/shared/hooks/ai/useValidateModels";

export const useChatSender = () => {
  const {
    promptWithoutResponse,
    setPromptWithoutResponse,
    setChatResponses,
    isSendingPrompts,
    setIsSendingPrompts,
  } = useChatStore();

  const { createResponsePlaceholders } = useResponsePlaceholders();
  const { fetchModelResponses } = useModelResponses();
  const { validateModels } = useValidateModels();

  const sendPrompts = useCallback(async (prompt: string) => {
    if (isSendingPrompts) {
      return;
    }

    setIsSendingPrompts(true);

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
      setIsSendingPrompts(false);
    }
  }, [
    isSendingPrompts,
    setIsSendingPrompts,
    validateModels,
    setChatResponses,
    createResponsePlaceholders,
    fetchModelResponses,
  ]);

  return {
    sendPrompts,
    isSending: isSendingPrompts,
    hasPromptToSend: Boolean(promptWithoutResponse),
    clearPrompt: () => setPromptWithoutResponse(""),
  };
};
