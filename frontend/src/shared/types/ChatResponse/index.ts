export enum Logo {
  GPT = "GPT",
  CLAUDE = "Claude",
  DEEPSEEK = "DeepSeek",
  QWEN = "qwen",
  LLAMA = "llama",
  GOOGLE = "google",

  smart_merge = "smart_merge"
}

export interface ChatResponse {
  id: number;
  uuid: string;
  model: string;
  number: number;
  response: string;
  spent: number;
  timeOfResponse: string;
  logo: Logo;
  isLoading?: boolean;
  isError?: boolean;
}
