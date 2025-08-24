import { useChatStore } from "@/shared/stores/chat";
import { createChat } from "@/shared/api/chats/requests";
import { v4 as uuidv4 } from "uuid";

export const useCreateNewChat = () => {
    
    const { setCurrentChatUuid } = useChatStore();

    const createNewChat = async (uuid:  ) => {
        const chat = await createChat({ uuid });
        setCurrentChatUuid(uuid);
    }

    return { createNewChat };
}