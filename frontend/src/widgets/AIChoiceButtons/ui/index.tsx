import Button from "@/shared/ui/Button";

const models: { label: string; value: string }[] = [
  { label: "GPT-3.5-turbo", value: "gpt-3.5-turbo" },
  { label: "GPT-4o-mini", value: "gpt-4o-mini" },
  { label: "Claude-sonnet-4-0", value: "claude-sonnet-4-0" },
  { label: "DeepSeek-v2", value: "deepseek-v2" },
];

export default function AIChoiceButtons() {
  return (
    <section
      className="
        flex flex-wrap justify-center gap-[24px] mt-[24px]
        max-[1100px]:w-[500px] max-[1100px]:mx-auto
      "
    >
      {models.map((model) => (
        <Button
          key={model.value}
          className="
            w-[230px] h-[50px] rounded-[25px] text-[24px]
          "
          label={model.label}
          onClick={() => {}}
        />
      ))}
    </section>
  );
}
