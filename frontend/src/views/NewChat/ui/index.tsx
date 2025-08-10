import Textarea from "@/shared/ui/Textarea";
import NewChatTitle from "@/widgets/NewChatTitle";
import { useChatStore } from "@/shared/stores/chat";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const NewChatView = () => {
  const { prompt, setPrompt } = useChatStore();
  const router = useRouter();

  const navigateToChat = () => {
    console.log(uuidv4());
    router.push(`/chat/${uuidv4()}`, );
  };

  return (
    <main className="w-[100%] flex flex-col items-center mt-[calc(50vh-40vh)]">
      <NewChatTitle />
      <Textarea
        sendButton={true}
        placeholder="Write your prompt..."
        className="w-[92vw] h-[50vh] mt-[20px] text-[30px]"
        value={prompt}
        onChange={(value) => setPrompt(value)}
        onClickSendButton={navigateToChat}
      />
    </main>
  );
};

export default NewChatView;
