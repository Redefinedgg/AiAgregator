import { useHandleSmartMerge } from "@/shared/hooks/ai/useHandleSmartMerge";
import Button from "@/shared/ui/Button";
import { useChatStore } from "@/shared/stores/chat";

export default function ChatTitleButtons() {
  const { handleSmartMerge } = useHandleSmartMerge();
  const { setIsShowContextPrompt } = useChatStore();

  return (
    <div className="flex items-center mr-[12px]">
      <Button
        onClick={() => setIsShowContextPrompt(true)}
        label="Continue"
        className="text-[24px] mr-[12px]"
        title="Absolutely free"
      />
      <Button
        onClick={handleSmartMerge}
        label="Smart merge"
        className="text-[24px] mr-[18px]"
        title="Absolutely free"
      />
    </div>
  );
}
