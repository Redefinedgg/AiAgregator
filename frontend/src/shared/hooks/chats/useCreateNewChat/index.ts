import { useChatStore } from "@/shared/stores/chat";
import { createChat } from "@/shared/api/chats/requests";

export const useCreateNewChat = () => {
    
    const { setCurrentChatUuid, nowDelayted } = useChatStore();

    const createNewChat = async (uuid: string) => {
        if (!uuid) return;
        if (nowDelayted) return;
        const chat = await createChat({ uuid });
    }

    return { createNewChat };
}