import User from "../User";
import Chat from "../Chat";

export interface Message {
  id: number;
  uuid: string;
  chatId: number;
  authorId: number;

  model: string;
  response: string;
  spent: number;
  timeOfResponse: string;
  number: number;

  createdAt: Date;
  updatedAt: Date;

  author: User;
  chat: Chat;
}

export default Message;

