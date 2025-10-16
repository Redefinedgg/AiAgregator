import { Model } from "@/shared/api/ai/enums"
import { sendPrompt } from "@/shared/api/ai/requests"
import { updateChat } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat"

export const useGenerateChatName = () => {
  const { updateChatName } = useChatStore();

  const generateChatName = async (prompt: string, uuid: string) => {
    const response = await sendPrompt({
      prompt: `Generate a creative chat title in ChatGPT’s style. The title should sound natural and modern. It must be in language that used in prompt, up to 4 words long, and can include spaces. Output only the title — no explanations or extra text. Prompt - ${prompt}`,
      model: Model.gemini_2_5_flash
    });

    const chatName = response.response;

    updateChatName(uuid, chatName);

    await updateChat(uuid, { name: chatName });
  }

  return { generateChatName }
}
