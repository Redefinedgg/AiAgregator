import { Module } from '@nestjs/common';
import { MessagesController } from './controller/messages.controller';
import { MessagesService } from './service/messages.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesHelper } from './helper/messages.helper';

@Module({
  imports: [PrismaModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesHelper],
  exports: [MessagesService],
})

export class MessagesModule {}
