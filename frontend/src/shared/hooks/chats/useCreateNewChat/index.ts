import { useChatStore } from "@/shared/stores/chat";
import { createChat } from "@/shared/api/chats/requests";
import { useAuthStore } from "@/shared/stores/auth";

export const useCreateNewChat = () => {
  const { nowDelayted } = useChatStore();
  const { user } = useAuthStore();

  const createNewChat = async (uuid: string) => {
    if (!uuid || !user) return;
    if (nowDelayted) return;
    await createChat({ user, uuid });
  }

  return { createNewChat };
}
