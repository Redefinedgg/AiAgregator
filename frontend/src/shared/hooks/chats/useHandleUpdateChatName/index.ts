import { updateChat } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat"

export const useHandleUpdateChatName = (uuid: string, isHeader?: boolean) => {
  const { updateChatName } = useChatStore();
  let stopEditing: any, tempName: any;

  if (isHeader) {
    const { stopEditingHeader, tempHeaderName } = useChatStore();
    stopEditing = stopEditingHeader;
    tempName = tempHeaderName;
  } else {
    const { stopEditingItem, tempItemName } = useChatStore();
    stopEditing = stopEditingItem;
    tempName = tempItemName;
  }

  const handleUpdateChatName = async () => {
    updateChatName(uuid, tempName);

    stopEditing();

    await updateChat(uuid, { name: tempName });
  }

  return { handleUpdateChatName }
}
