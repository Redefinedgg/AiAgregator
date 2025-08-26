import { Logo } from "@/shared/types/ChatResponse";

export const getLogoFromModel = (model: string | undefined): Logo => {
    if (!model) return "DeepSeek"; // Default fallback
    if (model.startsWith("claude")) return "Claude";
    if (model.startsWith("gpt")) return "GPT";
    if (model.startsWith("qwen")) return "qwen";
    if (model.startsWith("deepseek")) return "DeepSeek";
    if (model.startsWith("llama")) return "llama";
    if (model.startsWith("gemini")) return "google";
    return "DeepSeek";
  };