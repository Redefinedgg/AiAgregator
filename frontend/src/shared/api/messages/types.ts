export interface CreateMessageDto {
  model: string;
  response: string;
  spent: number;
  timeOfResponse: string;
  number: number;
}

export interface CreateMessagesDto {
  messages: CreateMessageDto[];
  chatUuid: string | null;
}

export interface CreateSmartMergeMessageDto {
  message: CreateMessageDto;
  chatUuid: string;
}
