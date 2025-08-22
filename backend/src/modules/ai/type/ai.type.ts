export interface TokenPricing {
  prompt: number;
  completion: number;
  contextLength?: number;
  maxOutput?: number;
}

export interface AIResponse {
  text: string;
  promptTokens: number;
  completionTokens: number;
  spent: number;
}