import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto, CreateMessagesDto } from '../dto/messages.dto';
import { CreateMessagesResponse } from '../response/messages.response';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) { }

  async createMessage(userId: number, chatId: number, body: CreateMessageDto) {
    try {
      const message = await this.prisma.message.create({
        data: {
          authorId: userId,
          uuid: uuidv4(),
          chatId: chatId,
          model: body.model,
          response: body.response,
          number: body.number,
          spent: body.spent,
          timeOfResponse: body.timeOfResponse,
        },
      });

      return { message };
    } catch (error) {
      throw error;
    }
  }

  async createMessages(userUuid: string, body: CreateMessagesDto): Promise<CreateMessagesResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid: userUuid } });
      if (!user) throw new NotFoundException('User not found');

      const chat = await this.prisma.chat.findUnique({ where: { uuid: body.chatUuid } });
      if (!chat) throw new NotFoundException("Chat not found");

      const newMessages: Message[] = await Promise.all(
        body.messages.map(async (message) => {
          const messageData = {
            ...message,
          };
          const created = await this.createMessage(user.id, chat.id, messageData);
          return created.message;
        })
      );

      return { messages: newMessages };
    } catch (err) {
      throw err;
    }
  }
}
