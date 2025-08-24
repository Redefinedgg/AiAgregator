import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateChatResponse } from '../response/chats.response';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(userUuid: string): Promise<CreateChatResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid: userUuid } });

      if (!user) {
        throw new Error('User not found');
      }

      const chat = await this.prisma.chat.create({
        data: {
          name: 'New Chat',
          authorId: user.id,
          uuid: uuidv4(),
        },
      });
      
      return { chat };
    } catch (error) {
      throw error;
    }
  }
}
