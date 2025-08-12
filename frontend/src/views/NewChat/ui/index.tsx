import Textarea from "@/shared/ui/Textarea";
import NewChatTitle from "@/widgets/NewChatTitle";
import { useChatStore } from "@/shared/stores/chat";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import AIChoiceButtons from "@/widgets/AIChoiceButtons";

const NewChatView = () => {
  const { prompt, setPrompt, setPromptWithoutResponse, selectedModels } =
    useChatStore();
  const router = useRouter();

  const navigateToChat = async () => {
    setPromptWithoutResponse(prompt);
    setPrompt("");
    const uuid = uuidv4();
    router.push(`/chat/${uuid}`);
  };

  return (
    <main className="w-[100%] flex flex-col items-center mt-[calc(50vh-45vh)]">
      <NewChatTitle />
      <Textarea
        sendButton={true}
        placeholder="Write your prompt..."
        className="w-[92vw] h-[50vh] mt-[20px] text-[30px]"
        value={prompt}
        onChange={(value) => setPrompt(value)}
        onClickSendButton={navigateToChat}
        canSend={prompt.trim().length > 0 && selectedModels.length > 0}
      />
      <AIChoiceButtons />
    </main>
  );
};

export default NewChatView;
