export enum Logo {
  GPT = "GPT",
  CLAUDE = "Claude",
  DEEPSEEK = "DeepSeek",
  QWEN = "qwen",
  LLAMA = "llama",
  GOOGLE = "google",

  SMART_MERGE = "smart-merge"
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
