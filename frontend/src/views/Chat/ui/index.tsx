import { FC, useEffect, useRef } from "react";
import ChatResponses from "@/widgets/ChatResponses";
import ChatWithoutResponses from "@/widgets/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { sendPrompt as sendPromptRequest } from "@/shared/api/ai/requests";
import { Model } from "@/shared/api/ai/enums";

const ChatView: FC = () => {
  const { promptWithoutResponse, setPromptWithoutResponse, setChatResponses, chatResponses } = useChatStore();
  const sendingRef = useRef(false);

  useEffect(() => {
    if (promptWithoutResponse && !sendingRef.current) {
      sendingRef.current = true;
      const sendPrompt = async () => {
        try {
          setChatResponses([]);
          const response = await sendPromptRequest({
            prompt: promptWithoutResponse,
            model: Model.gpt_3_5_turbo,
          });
          setChatResponses([
            {
              id: Date.now(),
              model: Model.gpt_3_5_turbo,
              number: 1,
              response: response.response,
              timeOfResponse: response.durationMs,
              logo: "GPT",
            },
          ]);
          setPromptWithoutResponse("");
        } catch (error) {
          console.error(error);
        } finally {
          sendingRef.current = false;
        }
      };
      sendPrompt();
    }
  }, [promptWithoutResponse]);

  return (
    <section className="w-full">
      {chatResponses.length > 0 ? <ChatResponses /> : <ChatWithoutResponses />}
      {/* <ChatResponses /> */}
    </section>
  );
};

export default ChatView;
