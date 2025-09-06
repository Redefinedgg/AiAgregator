import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateChatResponse, GetChatsByAuthorResponse } from '../response/chats.response';
import { CreateChatDto } from '../dto/chats.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) { }

  async createChat(
    userUuid: string,
    body: CreateChatDto,
  ): Promise<CreateChatResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: userUuid },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (body.uuid) {
        const existingChat = await this.prisma.chat.findUnique({
          where: { uuid: body.uuid },
        });
        if (existingChat) {
          throw new ConflictException('Chat already exists');
        }
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
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      // если что-то другое (например, ошибка Prisma)
      throw new InternalServerErrorException(
        error.message || 'Unexpected error occurred',
      );
    }
  }

  async getChatsByAuthor(uuid: string): Promise<GetChatsByAuthorResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const chats = await this.prisma.chat.findMany({
        where: { authorId: user.id },
      })

      return { chats };
    } catch (err) {
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        err instanceof NotFoundException ||
        err instanceof ConflictException
      ) {
        throw err;
      }

      // если что-то другое (например, ошибка Prisma)
      throw new InternalServerErrorException(
        err.message || 'Unexpected error occurred',
      );
    }
  }
}
