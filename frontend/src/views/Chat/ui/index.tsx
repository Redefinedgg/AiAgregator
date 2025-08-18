import { FC, useEffect, useRef } from "react";
import ChatResponses from "@/widgets/ChatResponses";
import ChatWithoutResponses from "@/widgets/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { useResponsePlaceholders } from "@/shared/hooks/useResponsePlaceholders";
import { useModelResponses } from "@/shared/hooks/useModelResponses";
import { toast } from "react-toastify";

const ChatView: FC = () => {
  const {
    promptWithoutResponse,
    setPromptWithoutResponse,
    setChatResponses,
    chatResponses,
    selectedModels,
  } = useChatStore();
  
  const { createResponsePlaceholders } = useResponsePlaceholders();
  const { fetchModelResponses } = useModelResponses();

  const sendingRef = useRef(false);

  useEffect(() => {
    if (promptWithoutResponse && !sendingRef.current) {
      sendingRef.current = true;
      
      const sendPrompts = async () => {
        try {
          setChatResponses([]);
          
          const validModels = selectedModels.filter(
            selectedModel => selectedModel && selectedModel.model
          );
          
          if (validModels.length === 0) {
            console.warn("No valid models selected");
            toast.error("No valid models selected");
            setPromptWithoutResponse("");
            sendingRef.current = false;
            return;
          }
          
          // Создаем placeholders
          const placeholders = createResponsePlaceholders(validModels);
          setChatResponses(placeholders);
          
          // Получаем ответы от моделей
          await fetchModelResponses({
            prompt: promptWithoutResponse,
            models: validModels,
            placeholders,
          });
          
          // Очищаем промпт
          setPromptWithoutResponse("");
          
        } catch (error) {
          console.error("Общая ошибка:", error);
        } finally {
          sendingRef.current = false;
        }
      };

      sendPrompts();
    }
  }, [
    promptWithoutResponse, 
    selectedModels, 
    setChatResponses, 
    setPromptWithoutResponse,
    createResponsePlaceholders,
    fetchModelResponses,
  ]);

  return (
    <section className="w-[100%]">
      {chatResponses.length > 0 ? <ChatResponses /> : <ChatWithoutResponses />}
    </section>
  );
};

export default ChatView;