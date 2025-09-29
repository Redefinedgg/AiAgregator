import { updateChat } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat"

export const useHandleUpdateChatName = (uuid: string, initialName: string) => {
  const { updateChatName, tempName, startEditing, stopEditing } = useChatStore();

  const handleUpdateChatName = async () => {
    startEditing(uuid, initialName);

    updateChatName(uuid, tempName);

    stopEditing();

    await updateChat(uuid, { name: tempName });
  }

  return { handleUpdateChatName }
}
