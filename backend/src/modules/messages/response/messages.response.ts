import { Message } from "@prisma/client";

export interface CreateMessagesResponse {
  messages: Message[];
}
