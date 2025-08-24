import {
  Controller,
  UseGuards,
  Post,
  Request,
} from '@nestjs/common';
import { MessagesService } from '../service/messages.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/types/extendedExpressRequest';
import { CreateMessageDto } from '../dto/messages.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Request() req: UserRequest, body: CreateMessageDto) {
    try {
      const message = await this.messagesService.createMessage(req.user.uuid, body);
      return message;
    } catch (error) {
      throw error;
    }
  }
}
