import { FC, useEffect, useRef } from "react";
import ChatResponses from "@/widgets/ChatResponses";
import ChatWithoutResponses from "@/widgets/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { Logo } from "@/shared/types/ChatResponse";
import { sendPrompt } from "@/shared/api/ai/requests";

const ChatView: FC = () => {
  const {
    promptWithoutResponse,
    setPromptWithoutResponse,
    setChatResponses,
    updateChatResponse,
    chatResponses,
    selectedModels,
  } = useChatStore();
  const sendingRef = useRef(false);

  useEffect(() => {
    if (promptWithoutResponse && !sendingRef.current) {
      sendingRef.current = true;
      
      const sendPrompts = async () => {
        try {
          // Очищаем предыдущие ответы
          setChatResponses([]);
          
          // Создаем placeholder'ы для каждой модели с индикацией загрузки
          const placeholders = selectedModels.map((selectedModel, index) => ({
            id: Date.now() + index,
            model: selectedModel.model,
            number: selectedModel.number,
            response: "", // Пустой ответ
            timeOfResponse: "загружается...",
            logo: (selectedModel.model.startsWith("claude")
              ? "Claude"
              : "GPT") as Logo,
            isLoading: true,
          }));
          
          // Добавляем все placeholder'ы сразу
          setChatResponses(placeholders);
          
          // Создаем массив промисов для каждой модели
          const promptPromises = selectedModels.map(async (selectedModel, index) => {
            const placeholderId = placeholders[index].id;
            
            try {
              const response = await sendPrompt({
                prompt: promptWithoutResponse,
                model: selectedModel.model,
              });
              
              const responseData = {
                id: placeholderId,
                model: selectedModel.model,
                number: selectedModel.number,
                response: response.response,
                timeOfResponse: response.durationMs,
                logo: (selectedModel.model.startsWith("claude")
                  ? "Claude"
                  : "GPT") as Logo,
                isLoading: false,
              };
              
              // Обновляем конкретный ответ
              updateChatResponse(placeholderId, responseData);
              
            } catch (error) {
              console.error(`Ошибка для модели ${selectedModel.model}:`, error);
              
              // Обновляем с ошибкой
              const errorResponse = {
                id: placeholderId,
                model: selectedModel.model,
                number: selectedModel.number,
                response: "Произошла ошибка при получении ответа",
                timeOfResponse: "ошибка",
                logo: (selectedModel.model.startsWith("claude")
                  ? "Claude"
                  : "GPT") as Logo,
                isLoading: false,
                isError: true,
              };
              
              updateChatResponse(placeholderId, errorResponse);
            }
          });
          
          // Ждем завершения всех запросов
          await Promise.allSettled(promptPromises);
          
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
  }, [promptWithoutResponse, selectedModels, setChatResponses, updateChatResponse, setPromptWithoutResponse]);

  return (
    <section className="w-full">
      {chatResponses.length > 0 ? <ChatResponses /> : <ChatWithoutResponses />}
    </section>
  );
};

export default ChatView;