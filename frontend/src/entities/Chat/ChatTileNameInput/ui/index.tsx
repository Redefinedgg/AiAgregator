import Input from "@/shared/ui/Input";
import { useChatStore } from "@/shared/stores/chat";
import { useHandleUpdateChatName } from "@/shared/hooks/chats/useHandleUpdateChatName";

export default function ChatTileNameInput() {
  const { tempHeaderName, changeTempHeaderName } = useChatStore();
  const { handleUpdateChatName } = useHandleUpdateChatName(undefined, true);
  return (
    <Input
      value={tempHeaderName}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        changeTempHeaderName(e.target.value)
      }
      placeholder="Enter chat name"
      className="text-[30px] w-full"
      onBlur={handleUpdateChatName}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && handleUpdateChatName()
      }
      autoFocus
    />
  );
}
