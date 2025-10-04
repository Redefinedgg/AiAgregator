import { Model } from "src/modules/ai/enum/ai.enum";

export class CreateMessageDto {
  model: Model;
  response: string;
  number: number;
  spent: number;
  timeOfResponse: string;
  isSmartMerge?: boolean;
}

export class CreateMessagesDto {
  messages: CreateMessageDto[];
  chatUuid: string;
}

export class CreateSmartMergeMessageDto {
  message: CreateMessageDto;
  chatUuid: string;
}

export class ValidateUserAndChatDto {
  userUuid: string;
  chatUuid: string;
}