import CopyButton from "@/shared/ui/CopyButton";
import Image from "next/image";
import { useChatStore } from "@/shared/stores/chat";
import { ChatResponse as ChatResponseType } from "@/shared/types/ChatResponse";
import { FC, useEffect, useState } from "react";
import { logoSizes } from "@/shared/constants/logoSizes";

interface Props {
  id: number | undefined;
}

const ChatResponseTitle: FC<Props> = ({ id }) => {
  const { chatResponses, getOneChatResponse } = useChatStore();
  const [chatResponse, setChatResponse] = useState<
    ChatResponseType | undefined | null
  >(null);
  
  useEffect(() => {
    const response = getOneChatResponse(id);
    setChatResponse(response);
  }, [chatResponses, id]);

  if (!chatResponse) return null;
  
  const size = logoSizes[chatResponse.logo] || { w: 64, h: 64 };
  return (
    <div className="flex items-center justify-between bg-[#1e1f1e]" style={{ borderRadius: "10px 10px 0px 0px" }}>
      {/* Левая часть: логотип + модель */}
      <div className="flex items-center">
        <div className="w-[64px] h-[64px] flex items-center justify-center">
          <Image
            src={`/logo/${chatResponse.logo}.png`}
            alt={`${chatResponse.logo} Logo`}
            className={size.className || ""}
            width={size.w}
            height={size.h}
          />
        </div>
        <span className="ml-2">
          {chatResponse.model} (#{chatResponse.number})
        </span>
      </div>

      {/* Правая часть: время + копировать */}
      <div className="flex items-center">
        <span className="mr-[10px]">{chatResponse.timeOfResponse}</span>
        <CopyButton className="mr-[12px]" text={chatResponse.response} />
      </div>
    </div>
  );
};

export default ChatResponseTitle;
