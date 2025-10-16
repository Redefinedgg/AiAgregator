import { Model } from "@/shared/api/ai/enums"
import { sendPrompt } from "@/shared/api/ai/requests"
import { updateChat } from "@/shared/api/chats/requests";
import { CHAT_GENERATING_PROMPT } from "@/shared/constants/CHAT_GENERATING_PROMPT";
import { useChatStore } from "@/shared/stores/chat"

export const useGenerateChatName = () => {
  const { updateChatName } = useChatStore();

  const generateChatName = async (prompt: string, uuid: string) => {
    const response = await sendPrompt({
      prompt: CHAT_GENERATING_PROMPT(prompt),
      model: Model.gemini_2_5_flash
    });

    const chatName = response.response;

    updateChatName(uuid, chatName);

    await updateChat(uuid, { name: chatName });
  }

  return { generateChatName }
}
