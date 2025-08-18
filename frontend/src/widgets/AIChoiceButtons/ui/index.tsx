"use client";

import Button from "@/shared/ui/Button";
import { SelectedModel, SelectedModelsCount, useChatStore } from "@/shared/stores/chat";
import { Model } from "@/shared/api/ai/enums";
import { useStoreHydration } from "@/shared/hooks/useHydration"; // Adjust path as needed
import SetCountOfModels from "@/entities/SetCountOfModels";
import ShowCountOfModels from "@/entities/ShowCountOfModels";

const models: { label: string; value: Model }[] = [
  { label: "GPT-3.5-turbo", value: Model.gpt_3_5_turbo },
  { label: "GPT-4o-mini", value: Model.gpt_4o_mini },
  { label: "Claude-sonnet-4-0", value: Model.claude_sonnet_4_0 },
  { label: "DeepSeek-chat", value: Model.deepseek_chat },
];

export default function AIChoiceButtons() {
  const { selectedModels, setSelectedModels, setSelectedModelsCount } = useChatStore();
  const isHydrated = useStoreHydration();

// В компоненте AIChoiceButtons
const handleModelClick = (model: Model) => {
  let updatedModels: SelectedModel[];
  if (selectedModels.some((m) => m.model === model)) {
    updatedModels = selectedModels.filter((m) => m.model !== model);
  } else {
    updatedModels = [...selectedModels, { model, number: 1 }];
  }
  setSelectedModels(updatedModels);

  const newCounts = models.map((m) => ({
    model: m.value,
    count: updatedModels.filter((sm) => sm.model === m.value).length,
  }));
  setSelectedModelsCount(newCounts);
};


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
