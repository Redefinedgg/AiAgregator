import { Chat, Message } from "@prisma/client";

export interface CreateChatResponse {
  chat: Chat;
}

export interface GetChatsByAuthorResponse {
  chats: Chat[];
}

export interface GetChatByUuidResponse {
  chat: Chat;
}

export interface GetChatMessagesByChatUuidResponse {
  messages: Message[];
}
