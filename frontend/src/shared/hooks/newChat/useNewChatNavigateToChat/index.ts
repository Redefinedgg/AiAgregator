import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "@/shared/stores/chat";

export const useNewChatNavigateToChat = () => {
  const { setPromptWithoutResponse, setPrompt, setCurrentChatUuid, prompt } =
    useChatStore();
  const router = useRouter();

  const navigateToChat = async () => {
    setPromptWithoutResponse(prompt);
    setPrompt("");
    const uuid = uuidv4();
    router.push(`/chat/${uuid}`);
    setCurrentChatUuid(uuid);
  };

  return {
    navigateToChat,
  };
};
