"use client";
import { FC } from "react";
import Image from "next/image";
import { useChatStore } from "@/shared/stores/chat";
import CopyButton from "@/shared/ui/CopyButton";
import useGetSizeOfLogo from "@/shared/hooks/chats/useGetSizeOfLogo";

export const ChatSelectedResponseTitle: FC = () => {
  const { selectedResponse, getOneChatResponse } = useChatStore();

  if (selectedResponse === null) return null;
  
  return (
    <div className="flex items-center justify-between bg-[#1e1f1e] w-[100%] h-[96px] rounded-[24px]">
      <div className="flex items-center">
        <div className="w-[128px] h-[128px] flex items-center justify-center">
          <Image
            src={`/logo/${
              getOneChatResponse(selectedResponse)?.logo || ""
            }.png`}
            alt={`${getOneChatResponse(selectedResponse)?.logo || ""} Logo`}
            className={useGetSizeOfLogo(selectedResponse).className || ""}
            width={useGetSizeOfLogo(selectedResponse).w * 1.5}
            height={useGetSizeOfLogo(selectedResponse).h * 1.5}
          />
        </div>
        <span className=" text-[24px]">
          {(getOneChatResponse(selectedResponse)
            ?.model?.charAt(0)
            .toUpperCase() || "") +
            (getOneChatResponse(selectedResponse)?.model?.slice(1) || "")}{" "}
          (#{getOneChatResponse(selectedResponse)?.number || ""})
        </span>
      </div>

      {/* Правая часть: время + копировать */}
      <div className="flex items-center gap-[12px]">
        <span className="mr-[10px] text-[24px]">
          {getOneChatResponse(selectedResponse)?.timeOfResponse || ""}
        </span>
        <CopyButton
          className="mr-[12px] text-[24px] h-[48px] w-[64px] rounded-[16px]"
          text={getOneChatResponse(selectedResponse)?.response || ""}
        />
      </div>
    </div>
  );
};

export default ChatSelectedResponseTitle;
