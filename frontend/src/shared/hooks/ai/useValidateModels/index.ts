// hooks/chats/useValidateModels.ts
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useChatStore } from "@/shared/stores/chat";

export const useValidateModels = () => {
  const { selectedModels } = useChatStore();

  const validateModels = useCallback(() => {
    const validModels = selectedModels.filter(
      model => model && model.model
    );

    if (validModels.length === 0) {
      console.warn("No valid models selected");
      toast.error("No valid models selected");
      return null;
    }

    return validModels;
  }, [selectedModels]);

  return { validateModels };
};
