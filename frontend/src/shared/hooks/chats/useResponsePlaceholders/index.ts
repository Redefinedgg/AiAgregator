// features/chat/lib/hooks/useResponsePlaceholders.ts
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { SelectedModel } from "@/shared/types/SelectedModel";
import { ChatResponse } from "@/shared/types/ChatResponse";
import { v4 as uuidv4 } from "uuid";

export const useResponsePlaceholders = () => {
  const createResponsePlaceholders = (
    validModels: SelectedModel[]
  ): ChatResponse[] => {
    return validModels.map((selectedModel, index) => ({
      id: Date.now() + index,
      model: selectedModel.model,
      number: selectedModel.number,
      response: "",
      spent: 0,
      timeOfResponse: "загружается...",
      logo: getLogoFromModel(selectedModel.model),
      isLoading: true,
      uuid: uuidv4(),
    }));
  };

  return { createResponsePlaceholders };
};
