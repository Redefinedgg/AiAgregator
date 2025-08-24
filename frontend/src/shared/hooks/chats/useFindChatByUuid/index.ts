import { useChatStore } from "@/shared/stores/chat";

export const useFindChatByUuid = () => {
    const { chats } = useChatStore();
};
