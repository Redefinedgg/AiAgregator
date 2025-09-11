import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { ChatsService } from '../service/chats.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/types/extendedExpressRequest';
import { CreateChatDto } from '../dto/chats.dto';
import { Param } from '@nestjs/common';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  async createChat(@Request() req: UserRequest, @Body() body: CreateChatDto) {
    try {
      const chat = await this.chatsService.createChat(req.user.uuid, body);
      return chat;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getChats(@Request() req: UserRequest) {
    try {
      const chats = await this.chatsService.getChatsByAuthor(req.user.uuid);
      return chats;
    } catch (err) {
      throw err;
    }
  }

  @Get(':uuid')
  async getChatByUuid(@Request() req: UserRequest, @Param('uuid') uuid: string) {
    try {
      const chat = await this.chatsService.getChatByUuid(req.user.uuid, uuid);
      return chat;
    } catch (err) {
      throw err;
    }
  }

  @Get(':uuid/messages')
  async getChatMessagesByChatUuid(@Request() req: UserRequest, @Param('uuid') uuid: string) {
    try {
      const messages = await this.chatsService.getChatMessagesByChatUuid(req.user.uuid, uuid);
      return messages;
    } catch (err) {
      throw err;
    }
  }
}
