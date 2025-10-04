import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { MessagesService } from '../service/messages.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/types/extendedExpressRequest';
import {
  CreateMessagesDto,
  CreateSmartMergeMessageDto,
} from '../dto/messages.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessages(
    @Request() req: UserRequest,
    @Body() body: CreateMessagesDto,
  ) {
    try {
      const messages = await this.messagesService.createMessages(
        req.user.uuid,
        body,
      );
      return messages;
    } catch (error) {
      throw error;
    }
  }

  @Post('smart-merge')
  @UseGuards(JwtAuthGuard)
  async createSmartMergeMessage(
    @Request() req: UserRequest,
    @Body() body: CreateSmartMergeMessageDto,
  ) {
    try {
      const messages = await this.messagesService.createSmartMergeMessage(
        req.user.uuid,
        body,
      );
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
