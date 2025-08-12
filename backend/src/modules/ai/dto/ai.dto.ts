import { Model } from "../enum/ai.enum";

export class SendPromptDto {
    prompt: string;
    model: Model;
}

export class SendPromptsDto {
    prompt: string;
    model: Model[];
}
