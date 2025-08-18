// features/chat/lib/hooks/useResponsePlaceholders.ts
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { SelectedModel } from "@/shared/stores/chat";
import { ChatResponse } from "@/shared/types/ChatResponse";

export const useResponsePlaceholders = () => {
  const createResponsePlaceholders = (
    validModels: SelectedModel[]
  ): ChatResponse[] => {
    return validModels.map((selectedModel, index) => ({
      id: Date.now() + index,
      model: selectedModel.model,
      number: selectedModel.number,
      response: "",
      timeOfResponse: "загружается...",
      logo: getLogoFromModel(selectedModel.model),
      isLoading: true,
    }));
  };

  return { createResponsePlaceholders };
};
