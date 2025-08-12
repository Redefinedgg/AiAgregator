export interface TokenPricing {
  prompt: number;
  completion: number;
  markup: number;
}

export interface AIResponse {
  text: string;
  promptTokens: number;
  completionTokens: number;
  spent: number;
  spentWithMarkup: number;
}