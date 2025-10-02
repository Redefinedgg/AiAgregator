import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import {
  CreateChatResponse,
  GetChatByUuidResponse,
  GetChatMessagesByChatUuidResponse,
  GetChatsByAuthorResponse,
} from '../response/chats.response';
import { CreateChatDto, UpdateChatDto } from '../dto/chats.dto';

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
      if (!uuid) {
        throw new UnauthorizedException('User not authorized');
      }
      const user = await this.prisma.user.findUnique({
        where: { uuid },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const chats = await this.prisma.chat.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: 'desc' },
      });
      return { chats };
    } catch (err) {
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        err instanceof NotFoundException ||
        err instanceof ConflictException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      // если что-то другое (например, ошибка Prisma)
      throw new InternalServerErrorException(
        err.message || 'Unexpected error occurred',
      );
    }
  }

  async getChatByUuid(
    userUuid: string,
    uuid: string,
  ): Promise<GetChatByUuidResponse> {
    try {
      if (!userUuid) {
        throw new UnauthorizedException('User not authorized');
      }
      const user = await this.prisma.user.findUnique({
        where: { uuid: userUuid },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!uuid) {
        throw new UnauthorizedException('Chat UUID is required');
      }

      const chat = await this.prisma.chat.findUnique({
        where: { uuid, authorId: user.id },
      });

      if (!chat) {
        throw new NotFoundException('Chat not found');
      }

      return { chat };
    } catch (err) {
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      // если что-то другое (например, ошибка Prisma)
      throw new InternalServerErrorException(
        err.message || 'Unexpected error occurred',
      );
    }
  }

  async getChatMessagesByChatUuid(
    userUuid: string,
    uuid: string,
  ): Promise<GetChatMessagesByChatUuidResponse> {
    try {
      if (!userUuid) {
        throw new UnauthorizedException('User not authorized');
      }

      const user = await this.prisma.user.findUnique({
        where: { uuid: userUuid },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!uuid) {
        throw new UnauthorizedException('Chat UUID is required');
      }

      const chat = await this.prisma.chat.findUnique({
        where: { uuid, authorId: user.id },
      });

      if (!chat) {
        throw new NotFoundException('Chat not found');
      }

      const messages = await this.prisma.message.findMany({
        where: { chatId: chat.id },
      });

      return { messages };
    } catch (err) {
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      // если что-то другое (например, ошибка Prisma)
      throw new InternalServerErrorException(
        err.message || 'Unexpected error occurred',
      );
    }
  }

  async updateChat(uuid: string, dto: UpdateChatDto) {
    try {
      await this.prisma.chat.update({
        where: { uuid },
        data: { ...dto }
      });
    } catch (err) {
      // если ошибка уже nestjs-овская — пробрасываем её
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
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
