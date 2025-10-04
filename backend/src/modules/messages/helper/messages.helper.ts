import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, ValidateUserAndChatDto } from '../dto/messages.dto';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesHelper {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(userId: number, chatId: number, body: CreateMessageDto) {
    try {
      const message = await this.prisma.message.create({
        data: {
          authorId: userId,
          uuid: uuidv4(),
          chatId: chatId,
          model: body.model,
          response: body.response.toString(),
          number: body.number,
          spent: body.spent,
          timeOfResponse: body.timeOfResponse,
          isSmartMerge: body.isSmartMerge,
        },
      });

      return { message };
    } catch (error: any) {
      throw error;
    }
  }

  async validateUserAndChat(body: ValidateUserAndChatDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: body.userUuid },
      });
      if (!user) throw new NotFoundException('User not found');

      const chat = await this.prisma.chat.findUnique({
        where: { uuid: body.chatUuid },
      });
      if (!chat) throw new NotFoundException('Chat not found');

      return { user, chat };
    } catch (error) {
      throw error;
    }
  }
}
