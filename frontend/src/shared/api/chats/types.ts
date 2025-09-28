import Chat from "@/shared/types/Chat";
import Message from "@/shared/types/Message";
import User from "@/shared/types/User";

export interface CreateChatResponse {
  chat: any;
}

export interface CreateChatDto {
  user: User;
  uuid: string;
}

export interface GetChatByUuidResponse {
  chat: Chat;
}

export interface GetChatMessagesByChatUuidResponse {
  messages: Message[];
}
