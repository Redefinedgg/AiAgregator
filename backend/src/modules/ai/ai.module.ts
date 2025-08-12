import { Module } from '@nestjs/common';
import { AiController } from './controller/ai.controller';
import { AiService } from './service/ai.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
