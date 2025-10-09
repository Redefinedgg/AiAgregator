import CopyButton from "@/shared/ui/CopyButton";
import Image from "next/image";
import { useChatStore } from "@/shared/stores/chat";
import { FC } from "react";
import useGetSizeOfLogo from "@/shared/hooks/chats/useGetSizeOfLogo";

interface Props {
  id: number | undefined;
}

const ChatResponseTitle: FC<Props> = ({ id }) => {
  const { getOneChatResponse } = useChatStore();

  if (!id) return null;

  return (
    <div
      className="flex items-center justify-between bg-[#1e1f1e]"
      style={{ borderRadius: "10px 10px 0px 0px" }}
    >
      {/* Левая часть: логотип + модель */}
      <div className="flex items-center">
        <div className="w-[64px] h-[64px] flex items-center justify-center">
          <Image
            src={`/logo/${getOneChatResponse(id)?.logo || ""}.png`}
            alt={`${getOneChatResponse(id)?.logo || ""} Logo`}
            className={useGetSizeOfLogo(id).className || ""}
            width={useGetSizeOfLogo(id).w}
            height={useGetSizeOfLogo(id).h}
          />
        </div>
        <span className="ml-2">
          {(getOneChatResponse(id)?.model?.charAt(0).toUpperCase() || "") +
            (getOneChatResponse(id)?.model?.slice(1) || "")}{" "}
          (#{getOneChatResponse(id)?.number || ""})
        </span>
      </div>

      {/* Правая часть: время + копировать */}
      <div className="flex items-center">
        <span className="mr-[10px]">
          {getOneChatResponse(id)?.timeOfResponse || ""}
        </span>
        <CopyButton
          className="mr-[12px]"
          text={getOneChatResponse(id)?.response || ""}
        />
      </div>
    </div>
  );
};

export default ChatResponseTitle;
