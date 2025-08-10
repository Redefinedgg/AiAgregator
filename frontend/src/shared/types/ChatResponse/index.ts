export type Logo = "GPT" | "Claude" | "DeepSeek";

export interface ChatResponse {
    id: number;
    model: string;
    number: number;
    response: string;
    timeOfResponse: string;
    logo: Logo;
}