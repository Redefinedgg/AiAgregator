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
}
