import Button from "@/shared/ui/Button";
import { useChatStore } from "@/shared/stores/chat";
import { Model } from "@/shared/api/ai/enums";

const models: { label: string; value: Model }[] = [
  { label: "GPT-3.5-turbo", value: Model.gpt_3_5_turbo },
  { label: "GPT-4o-mini", value: Model.gpt_4o_mini },
  { label: "Claude-sonnet-4-0", value: Model.claude_sonnet_4_0 },
  // { label: "DeepSeek-v2", value: Model.deepseek_v2 },
];

export default function AIChoiceButtons() {
  const { selectedModels, setSelectedModels } = useChatStore();
  const handleModelClick = (model: Model) => {
    const modelExists = selectedModels.some(m => m.model === model);
    if (modelExists) {
      setSelectedModels(selectedModels.filter(m => m.model !== model));
    } else {
      setSelectedModels([...selectedModels, { model, number: 1 }]);
    }
    console.log(selectedModels)
  };
  return (
    <section
      className="
        flex flex-wrap justify-center gap-[24px] mt-[24px] mb-[24px]
        max-[1100px]:w-[500px] max-[1100px]:mx-auto
      "
    >
      {models.map((model) => (
        <Button
          key={model.value}
          className="
            w-[230px] h-[50px] rounded-[25px] text-[24px]
          "
          selected={selectedModels.map((m) => m.model).includes(model.value)}
          label={model.label}
          onClick={() => handleModelClick(model.value)}
        />
      ))}
    </section>
  );
}
