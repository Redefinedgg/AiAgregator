import { Model } from "@/shared/api/ai/enums";

export const MODELS: { label: string; value: Model }[] = [
  { label: "GPT-3.5-turbo", value: Model.gpt_3_5_turbo },
  { label: "GPT-4o-mini", value: Model.gpt_4o_mini },
  { label: "Claude-sonnet-4-0", value: Model.claude_sonnet_4_0 },
  { label: "DeepSeek-chat", value: Model.deepseek_chat },
  { label: "GPT-5-NANO", value: Model.gpt_5_nano },
  { label: "DeepSeek-r1", value: Model.deepseek_reasoning },
  // { label: "GPT-4.1", value: Model.gpt_4_1}, commented cuz we need access on pollination for it 
  { label: "qwen-coder", value: Model.qwen_coder },
  { label: "llamascout", value: Model.llamascout },
  { label: "gemini 2.5 flash", value: Model.gemini_2_5_flash},
] as const;

export default MODELS;
