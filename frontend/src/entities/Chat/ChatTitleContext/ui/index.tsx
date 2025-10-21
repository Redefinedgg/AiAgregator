import { useChatStore } from "@/shared/stores/chat";
import Textarea from "@/shared/ui/Textarea";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSidebarStore } from "@/shared/stores/sidebar";
import { useEffect } from "react";
import { useLuckyPrompt } from "@/shared/hooks/ai/useLuckyPrompt";
import ShowCountOfModels from "@/entities/NewChat/CountOfModels/ShowCountOfModels";
import SetCountOfModels from "@/entities/NewChat/CountOfModels/SetCountOfModels";
import models from "@/shared/constants/MODELS";
import useHandleModelClick from "@/shared/hooks/chats/useHandleModelClick";
import { useHydration } from "@/shared/hooks/shared/useHydration";

export default function ChatTitleContext() {
  const {
    isShowContextPrompt,
    contextPrompt,
    setContextPrompt,
    selectedModels,
    luckyPromptIsLoading,
  } = useChatStore();
  const { luckyPrompt } = useLuckyPrompt();
  const isHydrated = useHydration();
  const { handleModelClick } = useHandleModelClick();
  const { widthOfSidebar } = useSidebarStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const continueContext = () => {};

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [contextPrompt]);

  return (
    <>
      {isShowContextPrompt && (
        <>
        <div className="flex flex-col items-center mt-[-12px] mb-[-12px] w-full relative">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              sendButton={true}
              placeholder="Write your prompt..."
              className="mt-[20px] text-[30px] overflow-hidden"
              style={{
                width: `calc(92vw - ${widthOfSidebar}px)`,
                paddingRight: "150px",
              }}
              value={contextPrompt}
              onChange={(value) => {
                setContextPrompt(value);
              }}
              onClickSendButton={continueContext}
              canSend={
                contextPrompt.trim().length > 0 && selectedModels.length > 0
              }
            />
            <Button
              className="w-[50px] h-[50px] bg-[rgb(133,133,133)] flex rounded-[25px] items-center justify-center absolute bottom-[18px] right-[84px] z-[2]"
              label={<p className="text-[32px]">?</p>}
              onClick={() =>
                luckyPrompt({ params: { setPrompts: [setContextPrompt] } })
              }
              disabled={luckyPromptIsLoading}
            />
          </div>
        </div>
            <section
              className="
                flex flex-wrap justify-center gap-[24px] mt-[24px] mb-[24px]
              "
              style={{ maxWidth: `calc(92vw - ${widthOfSidebar}px)` }}
            >
              {models.map((model) => (
                <div key={model.value} className="flex items-center gap-[6px] relative">
                  <Button
                    className="w-[230px] h-[50px] rounded-[25px] text-[24px]"
                    selected={
                      isHydrated
                        ? selectedModels.some((m) => m.model === model.value)
                        : false
                    }
                    label={model.label}
                    onClick={
                      isHydrated ? () => handleModelClick(model.value) : undefined
                    }
                  />
                  <ShowCountOfModels model={model.value} />
                  <SetCountOfModels model={model.value} />
                </div>
              ))}
            </section>
        </>
      )}
    </>
  );
}
