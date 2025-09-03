import User from "@/shared/types/User";

export interface CreateChatResponse {
  chat: any;
}

export interface CreateChatDto {
  user: User;
  uuid: string;
}
