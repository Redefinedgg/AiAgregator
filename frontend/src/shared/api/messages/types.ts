import Message from "@/shared/types/Message";

export interface CreateMessageDto {
  model: string;
  response: string;
  spent: number;
  timeOfResponse: string;
}

export interface CreateMessagesDto {
  messages: CreateMessageDto[];
  chatUuid: string;
}

export interface CreateMessagesResponse {
  messages: Message[];
}
