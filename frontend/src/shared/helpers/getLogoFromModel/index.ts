import { Model } from "@/shared/api/ai/enums";
import { Logo } from "@/shared/types/ChatResponse";

export const getLogoFromModel = (model: Model): Logo => {
  if (!model) return Logo.DEEPSEEK;
  if (model.startsWith("claude")) return Logo.CLAUDE;
  if (model.startsWith("gpt")) return Logo.GPT;
  if (model.startsWith("qwen")) return Logo.QWEN;
  if (model.startsWith("deepseek")) return Logo.DEEPSEEK;
  if (model.startsWith("llama")) return Logo.LLAMA;
  if (model.startsWith("gemini")) return Logo.GOOGLE;
  if (model.startsWith("smart-merge")) return Logo.SMART_MERGE;
  return Logo.DEEPSEEK;
};
