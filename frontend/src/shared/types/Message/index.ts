// model Message {
//   id       Int    @id @default(autoincrement())
//   uuid     String @unique
//   chatId   Int
//   authorId Int

import User from "../User";
import Chat from "../Chat";

//   model          String
//   response       String
//   spent          Float
//   timeOfResponse String

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   author User @relation(fields: [authorId], references: [id])
//   chat   Chat @relation(fields: [chatId], references: [id])
// }


export interface Message {
    id: number;
    uuid: string;
    chatId: number;
    authorId: number;

    model: string;
    response: string;
    spent: number;
    timeOfResponse: string;

    createdAt: Date;
    updatedAt: Date;

    author: User;
    chat: Chat;
}

export default Message;
  