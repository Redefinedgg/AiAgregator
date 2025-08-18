import { Logo } from "@/shared/types/ChatResponse";

export const getLogoFromModel = (model: string | undefined): Logo => {
    if (!model) return "DeepSeek"; // Default fallback
    if (model.startsWith("claude")) return "Claude";
    if (model.startsWith("gpt")) return "GPT";
    return "DeepSeek";
  };