import { Model } from "@/shared/api/ai/enums";

export const MODELS: { label: string; value: Model }[] = [
  { label: "GPT-3.5-turbo", value: Model.gpt_3_5_turbo },
  { label: "GPT-4o-mini", value: Model.gpt_4o_mini },
  { label: "Claude-sonnet-4-0", value: Model.claude_sonnet_4_0 },
  { label: "DeepSeek-chat", value: Model.deepseek_chat },
] as const;

export default MODELS;
