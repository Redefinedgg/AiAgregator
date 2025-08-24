import { Model } from "src/modules/ai/enum/ai.enum";

export class CreateMessageDto {
  chatId: number;
  model: Model;
  response: string;
  spent: number;
  timeOfResponse: string;
}
