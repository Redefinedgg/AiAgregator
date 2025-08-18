// features/chat/lib/hooks/useModelResponses.ts

import { sendPrompt } from "@/shared/api/ai/requests";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { useChatStore } from "@/shared/stores/chat";
import { SelectedModel } from "@/shared/stores/chat";

interface FetchModelResponsesParams {
  prompt: string;
  models: SelectedModel[];
  placeholders: any;
}

export const useModelResponses = () => {
  const {updateChatResponse} = useChatStore()

  const fetchModelResponses = async ({ prompt, models, placeholders }: FetchModelResponsesParams) => {
    const promptPromises = models.map(async (selectedModel, index) => {
      const placeholderId = placeholders[index].id;
      
      try {
        const response = await sendPrompt({
          prompt,
          model: selectedModel.model,
        });
        
        const responseData = {
          id: placeholderId,
          model: selectedModel.model,
          number: selectedModel.number,
          response: response.response,
          timeOfResponse: response.durationMs,
          logo: getLogoFromModel(selectedModel.model),
          isLoading: false,
        };
        
        updateChatResponse(placeholderId, responseData);
        
      } catch (error) {
        console.error(`Ошибка для модели ${selectedModel.model}:`, error);
        
        const errorResponse = {
          id: placeholderId,
          model: selectedModel.model,
          number: selectedModel.number,
          response: "Произошла ошибка при получении ответа",
          timeOfResponse: "ошибка",
          logo: getLogoFromModel(selectedModel.model),
          isLoading: false,
          isError: true,
        };
        
        updateChatResponse(placeholderId, errorResponse);
      }
    });
    
    await Promise.allSettled(promptPromises);
  };

  return { fetchModelResponses };
};