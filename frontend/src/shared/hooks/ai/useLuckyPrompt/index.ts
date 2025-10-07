import { luckyPrompt as luckyPromptRequest } from "@/shared/api/ai/requests";
import { LuckyPromptDto } from "@/shared/api/ai/types";
import { useChatStore } from "@/shared/stores/chat";

export const useLuckyPrompt = () => {
  const { setPrompt, luckyPromptIsLoading, setLuckyPromptIsLoading } =
    useChatStore();

  const luckyPrompt = async (body: LuckyPromptDto = {}) => {
    try {
      setLuckyPromptIsLoading(true);
      const { response } = await luckyPromptRequest(body);
      setPrompt(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLuckyPromptIsLoading(false);
    }
  };

  return {
    luckyPrompt,
  };
};
