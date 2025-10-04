import User from "../User";
import Chat from "../Chat";
import { Model } from "@/shared/api/ai/enums";

export interface Message {
  id: number;
  uuid: string;
  chatId: number;
  authorId: number;

  model: Model;
  response: string;
  spent: number;
  timeOfResponse: string;
  number: number;
  isSmartMerge: boolean;

  createdAt: Date;
  updatedAt: Date;

  author: User;
  chat: Chat;
}

export default Message;

