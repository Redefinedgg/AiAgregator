import { Chat } from "@prisma/client";

export interface CreateChatResponse {
    chat: Chat;
}