"use client";
import Textarea from "@/shared/ui/Textarea";
import { useChatStore } from "@/shared/stores/chat";
import { useSidebarStore } from "@/shared/stores/sidebar";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import Button from "@/shared/ui/Button";
import { useLuckyPrompt } from "@/shared/hooks/ai/useLuckyPrompt";

export default function NewChatTextarea() {
  const {
    prompt,
    setPrompt,
    setPromptWithoutResponse,
    setOldPrompt,
    selectedModels,
    setCurrentChatUuid,
    luckyPromptIsLoading,
  } = useChatStore();
  const { luckyPrompt } = useLuckyPrompt();

  const router = useRouter();
  const { widthOfSidebar } = useSidebarStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigateToChat = async () => {
    setPromptWithoutResponse(prompt);
    setPrompt("");
    const uuid = uuidv4();
    router.push(`/chat/${uuid}`);
    setCurrentChatUuid(uuid);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        sendButton={true}
        placeholder="Write your prompt..."
        className="mt-[20px] text-[30px] overflow-hidden"
        style={{ width: `calc(92vw - ${widthOfSidebar}px)`, paddingRight: "150px" }}
        value={prompt}
        onChange={(value) => {
          setPrompt(value);
          setOldPrompt(value);
        }}
        onClickSendButton={navigateToChat}
        canSend={prompt.trim().length > 0 && selectedModels.length > 0}
      />
      <Button
        className="w-[50px] h-[50px] bg-[rgb(133,133,133)] flex rounded-[25px] items-center justify-center absolute bottom-[18px] right-[84px] z-[2]"
        label={<p className="text-[32px]">?</p>}
        onClick={luckyPrompt}
        disabled={luckyPromptIsLoading}
      />
    </div>
  );
}
