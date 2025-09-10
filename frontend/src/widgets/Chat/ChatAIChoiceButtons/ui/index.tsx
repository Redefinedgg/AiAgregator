"use client";

import Button from "@/shared/ui/Button";
import {
  useChatStore,
} from "@/shared/stores/chat";
import { Model } from "@/shared/api/ai/enums";
import { useStoreHydration } from "@/shared/hooks/shared/useHydration"; // Adjust path as needed
import SetCountOfModels from "@/entities/NewChat/CountOfModels/SetCountOfModels";
import ShowCountOfModels from "@/entities/NewChat/CountOfModels/ShowCountOfModels";
import models from "@/shared/constants/MODELS";
import useHandleModelClick from "@/shared/hooks/chats/useHandleModelClick";
import { useSidebarStore } from "@/shared/stores/sidebar";

export default function ChatAIChoiceButtons() {
  const { selectedModels } = useChatStore();
  const isHydrated = useStoreHydration();
  const { handleModelClick } = useHandleModelClick();
  const {widthOfSidebar} = useSidebarStore();

  return (
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
  );
}
