import { updateChat } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat"

export const useHandleUpdateChatName = (chatUuid?: string, isHeader?: boolean) => {
  const { updateChatName } = useChatStore();
  let stopEditing: any, tempName: string, uuid: string | null;

  if (isHeader) {
    const { stopEditingHeader, tempHeaderName } = useChatStore();
    stopEditing = stopEditingHeader;
    tempName = tempHeaderName;
  } else {
    const { stopEditingItem, tempItemName } = useChatStore();
    stopEditing = stopEditingItem;
    tempName = tempItemName;
  }

  if (chatUuid) {
    uuid = chatUuid
  } else {
    const { currentChatUuid } = useChatStore();
    uuid = currentChatUuid;
  }

  const handleUpdateChatName = async () => {
    if (!uuid) return;

    updateChatName(uuid, tempName);

    stopEditing();

    await updateChat(uuid, { name: tempName });
  }

  return { handleUpdateChatName }
}
