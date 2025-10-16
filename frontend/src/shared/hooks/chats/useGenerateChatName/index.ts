import { Model } from "@/shared/api/ai/enums"
import { sendPrompt } from "@/shared/api/ai/requests"
import { updateChat } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat"

export const useGenerateChatName = () => {
  const { updateChatName } = useChatStore();

  const generateChatName = async (prompt: string, uuid: string) => {
    const response = await sendPrompt({
      prompt: `You will be given a text prompt in any language. Your task is to generate a short and clear chat title for it, similar to how ChatGPT names chats.
      The title must:

      Be written in the same language as the given prompt.

      Summarize the main topic or intent of the prompt.

      Be concise, usually 2–5 words long.

      Use title-style capitalization (only capitalize proper nouns and the first word).

      Do not include verbs like “write”, “explain”, or “generate” — instead, use a noun phrase that captures the essence.

      Examples:

      Input: “напиши любую химическую формулу” → Output: “Химическая формула”

      Input: “напиши все фракции mount and blade 2” → Output: “Фракции Mount & Blade 2”

      Input: “чем чатгпт лучше гемини” → Output: “Сравнение ChatGPT и Gemini”

      Input: “list all countries in Europe” → Output: “European countries”

      Input: “how to fix python import errors” → Output: “Python import errors”

      Generate only the chat title as described above — no explanations, no extra text. Prompt - ${prompt}`,
      model: Model.gemini_2_5_flash
    });

    const chatName = response.response;

    updateChatName(uuid, chatName);

    await updateChat(uuid, { name: chatName });
  }

  return { generateChatName }
}
