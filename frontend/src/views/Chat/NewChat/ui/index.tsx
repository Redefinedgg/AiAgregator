"use client";
import { useChatStore } from "@/shared/stores/chat";
import Textarea from "@/shared/ui/Textarea";
import ChatAIChoiceButtons from "@/widgets/Chat/ChatAIChoiceButtons";
import NewChatTitle from "@/widgets/NewChat/NewChatTitle";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSidebarStore } from "@/shared/stores/sidebar";

const NewChatView = () => {
  const {
    prompt,
    setPrompt,
    setPromptWithoutResponse,
    selectedModels,
    setCurrentChatUuid,
  } = useChatStore();
  const router = useRouter();
  const { widthOfSidebar } = useSidebarStore();

  const navigateToChat = async () => {
    setPromptWithoutResponse(prompt);
    setPrompt("");
    const uuid = uuidv4();
    router.push(`/chat/${uuid}`);
    setCurrentChatUuid(uuid);
  };

  return (
    <main className="flex flex-col items-center mt-[calc(50vh-45vh)] w-[100%]">
      <NewChatTitle />
      <Textarea
        sendButton={true}
        placeholder="Write your prompt..."
        className="h-[50vh] mt-[20px] text-[30px]"
        style={{ width: `calc(92vw - ${widthOfSidebar}px)` }}
        value={prompt}
        onChange={(value) => setPrompt(value)}
        onClickSendButton={navigateToChat}
        canSend={prompt.trim().length > 0 && selectedModels.length > 0}
      />
      <ChatAIChoiceButtons />
    </main>
  );
};

export default NewChatView;