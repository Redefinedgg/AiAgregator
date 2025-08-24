"use client";

import Button from "@/shared/ui/Button";
import {
  SelectedModel,
  SelectedModelsCount,
  useChatStore,
} from "@/shared/stores/chat";
import { Model } from "@/shared/api/ai/enums";
import { useStoreHydration } from "@/shared/hooks/shared/useHydration"; // Adjust path as needed
import SetCountOfModels from "@/entities/NewChat/CountOfModels/SetCountOfModels";
import ShowCountOfModels from "@/entities/NewChat/CountOfModels/ShowCountOfModels";
import models from "@/shared/constants/MODELS";
import useHandleModelClick from "@/shared/hooks/chats/useHandleModelClick";

export default function ChatAIChoiceButtons() {
  const { selectedModels } = useChatStore();
  const isHydrated = useStoreHydration();
  const { handleModelClick } = useHandleModelClick();

  return (
    <section
      className="
        flex flex-wrap justify-center gap-[24px] mt-[24px] mb-[24px]
        max-[1100px]:w-[500px] max-[1100px]:mx-auto
      "
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
