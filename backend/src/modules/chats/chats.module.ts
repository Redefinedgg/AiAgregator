import { Module } from '@nestjs/common';
import { ChatsController } from './controller/chats.controller';
import { ChatsService } from './service/chats.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
