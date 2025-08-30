export type Logo = "GPT" | "Claude" | "DeepSeek" | "qwen" | "llama" | "google";

export interface ChatResponse {
    id: number;
    model: string;
    number: number;
    response: string;
    timeOfResponse: string;
    logo: Logo;
    isLoading?: boolean;
    isError?: boolean;
}