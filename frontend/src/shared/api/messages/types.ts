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
