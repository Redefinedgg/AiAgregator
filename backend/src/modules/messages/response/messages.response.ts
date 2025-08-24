import { Message } from "@prisma/client";

export interface CreateMessageResponse {
    message: Message;
}