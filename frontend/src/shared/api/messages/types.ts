import { Model } from "../ai/enums";

export interface CreateMessageDto {
    chatId: number;
    model: Model;
    response: string;
    spent: number;
    timeOfResponse: string;
}