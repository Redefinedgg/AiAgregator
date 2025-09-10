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
    setChats,
    chats,
  } = useChatStore();

  const { user } = useAuthStore();

  const createNewChat = async (uuid: string) => {
    if (!uuid || !user) {
      console.error("Missing uuid or user");
      return;
    }

    if (nowDelayted) {
      console.error("Chat creation is delayed");
      return;
    }

    if (alreadyUsedUuids.includes(uuid)) {
      console.error("UUID already used:", uuid);
      return;
    }

    // Проверяем, есть ли уже активный запрос для этого UUID
    if (hasActiveCreateChatRequest(uuid)) {
      console.error("Already creating chat for uuid:", uuid);
      return;
    }

    console.log("create new chat start");

    // Добавляем UUID в список активных запросов
    addActiveCreateChatRequest(uuid);

    try {
      const newChat = await createChat({ user, uuid });
      setChats([...chats, newChat.data.chat])
      setAlreadyUsedUuids([...alreadyUsedUuids, uuid]);
      setNowDelayted(true);

      setTimeout(() => {
        setNowDelayted(false);
      }, 2000);

      console.log("create new chat finish")

      return newChat.data;
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      removeActiveCreateChatRequest(uuid);
    }
  };

  return { createNewChat };
};
