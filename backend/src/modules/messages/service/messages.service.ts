import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from '../dto/messages.dto';
import { CreateMessageResponse } from '../response/messages.response';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(userUuid: string, body: CreateMessageDto): Promise<CreateMessageResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid: userUuid } });

      if (!user) {
        throw new Error('User not found');
      }

      const message = await this.prisma.message.create({
        data: {
          authorId: user.id,
          uuid: uuidv4(),
          chatId: body.chatId,
          model: body.model,
          response: body.response,
          spent: body.spent,
          timeOfResponse: body.timeOfResponse,
        },
      });
      
      return { message };
    } catch (error) {
      throw error;
    }
  }
}
