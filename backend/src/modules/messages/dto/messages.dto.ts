import { Model } from "src/modules/ai/enum/ai.enum";

export class CreateMessageDto {
  model: Model;
  response: string;
  spent: number;
  timeOfResponse: string;
}

export class CreateMessagesDto {
  messages: CreateMessageDto[];
  chatUuid: string;
}
