// features/chat/lib/hooks/useModelResponses.ts

import { sendPrompt } from "@/shared/api/ai/requests";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { useChatStore } from "@/shared/stores/chat";
import SelectedModel from "@/shared/types/SelectedModel";
import { useAuthStore } from "@/shared/stores/auth";
import { toast } from "react-toastify";
import User from "@/shared/types/User";
import { updateMe } from "@/shared/api/users/requests";

interface FetchModelResponsesParams {
  prompt: string;
  models: SelectedModel[];
  placeholders: any;
}

export const useModelResponses = () => {
  const { updateChatResponse } = useChatStore();
  const { user, setUser } = useAuthStore();

  const fetchModelResponses = async ({
    prompt,
    models,
    placeholders,
  }: FetchModelResponsesParams) => {
    const promptPromises = models.map(async (selectedModel, index) => {
      const placeholderId = placeholders[index].id;

      try {
        if (!user) {
          throw new Error("User not found");
        }

        if (user.balance < 0) {
          toast.error(
            `Not enough balance for ${selectedModel.model} #${selectedModel.number}`
          );
          updateChatResponse(placeholderId, {
            id: placeholderId,
            model: selectedModel.model,
            number: selectedModel.number,
            response: "Not enough balance",
            spent: 0,
            timeOfResponse: "error",
            logo: getLogoFromModel(selectedModel.model),
            isLoading: false,
            isError: true,
          });
          return;
        }
        const response = await sendPrompt({
          prompt,
          model: selectedModel.model,
        });

        const responseData = {
          id: placeholderId,
          model: selectedModel.model,
          number: selectedModel.number,
          response: response.response,
          spent: response.spent,
          timeOfResponse: response.durationMs,
          logo: getLogoFromModel(selectedModel.model),
          isLoading: false,
        };

        // Получаем актуальное значение пользователя и обновляем баланс
        const currentUser = useAuthStore.getState().user;
        if (
          response &&
          response.spent &&
          user.balance !== undefined &&
          user !== null &&
          currentUser !== null
        ) {
          const updaterNewUser: User = {
            ...currentUser,
            balance: currentUser.balance - response.spent,
          };

          setUser(updaterNewUser);
          await updateMe({ balance: updaterNewUser.balance });
        }

        updateChatResponse(placeholderId, responseData);
      } catch (error) {
        console.error(`Error for model ${selectedModel.model}:`, error);

        const errorResponse = {
          id: placeholderId,
          model: selectedModel.model,
          number: selectedModel.number,
          response: "Error while getting response",
          spent: 0,
          timeOfResponse: "error",
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
