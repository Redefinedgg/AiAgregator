import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import {
  CreateMessagesDto,
  CreateSmartMergeMessageDto,
} from '../dto/messages.dto';
import { CreateMessagesResponse } from '../response/messages.response';
import { Message } from '@prisma/client';
import { MessagesHelper } from '../helper/messages.helper';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messagesHelper: MessagesHelper,
  ) { }

  async createMessages(
    userUuid: string,
    body: CreateMessagesDto,
  ): Promise<CreateMessagesResponse> {
    try {
      const { user, chat } = await this.messagesHelper.validateUserAndChat({
        userUuid,
        chatUuid: body.chatUuid,
      });

      const newMessages: Message[] = await Promise.all(
        body.messages.map(async (message) => {
          const messageData = {
            ...message,
          };
          const created = await this.messagesHelper.createMessage(
            user.id,
            chat.id,
            messageData,
          );
          return created.message;
        }),
      );

      return { messages: newMessages };
    } catch (err) {
      throw err;
    }
  }

  async createSmartMergeMessage(
    userUuid: string,
    body: CreateSmartMergeMessageDto,
  ) {
    try {
      const { user, chat } = await this.messagesHelper.validateUserAndChat({
        userUuid,
        chatUuid: body.chatUuid,
      });

      if (chat.smartMerges >= 1) {
        throw new Error('Chat already smart merged');
      }

      const { message } = await this.messagesHelper.createMessage(
        user.id,
        chat.id,
        {
          ...body.message,
          isSmartMerge: true,
        },
      );

      await this.prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          smartMerges: {
            increment: 1,
          },
        },
      });

      return { message };
    } catch (err) {
      throw err;
    }
  }
}
