import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateChatResponse } from '../response/chats.response';
import { CreateChatDto } from '../dto/chats.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(userUuid: string, body: CreateChatDto): Promise<CreateChatResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid: userUuid } });

      if (!user) {
        throw new Error('User not found');
      }

      const chat = await this.prisma.chat.create({
        data: {
          name: 'New Chat',
          authorId: user.id,
          uuid: body.uuid,
        },
      });
      
      return { chat };
    } catch (error) {
      throw error;
    }
  }
}
