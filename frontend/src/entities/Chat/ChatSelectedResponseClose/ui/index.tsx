import { FC } from "react";
import { IoIosClose } from "react-icons/io";
import { useChatStore } from "@/shared/stores/chat";

export const ChatSelectedResponseClose: FC = () => {
  const { setSelectedResponse } = useChatStore();
  return (
    <div className="absolute top-[-11px] right-[-11px] cursor-pointer bg-[#1e1f1e] rounded-[50%] items-center flex">
      <IoIosClose size={36} onClick={() => setSelectedResponse(null)} />
    </div>
  );
};

export default ChatSelectedResponseClose;
