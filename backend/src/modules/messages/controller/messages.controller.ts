import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { MessagesService } from '../service/messages.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/types/extendedExpressRequest';
import { CreateMessagesDto } from '../dto/messages.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  async createMessages(@Request() req: UserRequest, @Body() body: CreateMessagesDto) {
    console.log(body)
    console.log(body.chatUuid)
    try {
      const messages = await this.messagesService.createMessages(req.user.uuid, body);
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
