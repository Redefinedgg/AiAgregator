// hooks/useCreateNewChat.ts
import { useChatStore } from "@/shared/stores/chat";
import { createChat } from "@/shared/api/chats/requests";
import { useAuthStore } from "@/shared/stores/auth";

export const useCreateNewChat = () => {
  const { 
    nowDelayted, 
    setNowDelayted, 
    alreadyUsedUuids, 
    setAlreadyUsedUuids,
    hasActiveCreateChatRequest,
    addActiveCreateChatRequest,
    removeActiveCreateChatRequest,
  } = useChatStore();
  
  const { user } = useAuthStore();

  const createNewChat = async (uuid: string) => {
    if (!uuid || !user) {
      console.log("Missing uuid or user");
      return;
    }
    
    if (nowDelayted) {
      console.log("Chat creation is delayed");
      return;
    }
    
    if (alreadyUsedUuids.includes(uuid)) {
      console.log("UUID already used:", uuid);
      return;
    }
    
    // Проверяем, есть ли уже активный запрос для этого UUID
    if (hasActiveCreateChatRequest(uuid)) {
      console.log("Already creating chat for uuid:", uuid);
      return;
    }

    // Добавляем UUID в список активных запросов
    addActiveCreateChatRequest(uuid);
    
    try {
      await createChat({ user, uuid });
      setAlreadyUsedUuids([...alreadyUsedUuids, uuid]);
      setNowDelayted(true);
      
      setTimeout(() => {
        setNowDelayted(false);
      }, 2000);
      
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      removeActiveCreateChatRequest(uuid);
    }
  };

  return { createNewChat };
};