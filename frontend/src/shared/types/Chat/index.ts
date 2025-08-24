// export type $ChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
//   name: "Chat"
//   objects: {
//     author: Prisma.$UserPayload<ExtArgs>
//     messages: Prisma.$MessagePayload<ExtArgs>[]
//   }
//   scalars: $Extensions.GetPayloadResult<{
//     id: number
//     uuid: string
//     authorId: number
//     name: string | null
//     spent: number
//     createdAt: Date
//     updatedAt: Date
//   }, ExtArgs["result"]["chat"]>
//   composites: {}
// }

import Message from "../Message";
import User from "../User";

export interface Chat {
    id: number;
    uuid: string;
    authorId: number;
    name: string | null;
    spent: number;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    messages: Message[];
}

export default Chat;