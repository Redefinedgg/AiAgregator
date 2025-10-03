export interface CreateMessageDto {
  model: string;
  response: string;
  spent: number;
  timeOfResponse: string;
}

export interface CreateMessagesDto {
  messages: CreateMessageDto[];
  chatUuid: string | null;
}

export interface CreateSmartMergeMessageDto {
  message: CreateMessageDto;
  chatUuid: string;
}
