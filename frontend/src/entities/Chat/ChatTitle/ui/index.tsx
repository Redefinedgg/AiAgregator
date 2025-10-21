import ChatTileNameInput from "../../ChatTileNameInput";
import EditChatTitleButton from "../../EditChatTitleButton";
import { useChatStore } from "@/shared/stores/chat";
import { useGetChatsName } from "@/shared/hooks/chats/useGetChatsName";

const ChatTitle = () => {
  const { currentChatUuid, editingHeader, startEditingHeader } = useChatStore();
  const { getChatsName } = useGetChatsName();

  return (
    <div className="flex items-center gap-[12px]">
      {editingHeader === currentChatUuid ? (
        <ChatTileNameInput />
      ) : (
        <h1 className="block p-2 rounded text-[30px] px-[25px] py-[15px] rounded-[12px]">
          {getChatsName() || "New Chat"}
        </h1>
      )}
      <EditChatTitleButton
        onClick={() => startEditingHeader(getChatsName() || "New Chat")}
      />
    </div>
  );
};

export default ChatTitle;
