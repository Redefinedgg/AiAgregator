import {
  Controller,
  UseGuards,
  Post,
  Request,
} from '@nestjs/common';
import { ChatsService } from '../service/chats.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/types/extendedExpressRequest';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Request() req: UserRequest) {
    try {
      const chat = await this.chatsService.createChat(req.user.uuid);
      return chat;
    } catch (error) {
      throw error;
    }
  }
}
