import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../modules/ai/ai.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { ChatsModule } from '../modules/chats/chats.module';
import { MessagesModule } from '../modules/messages/messages.module';
import { HttpLoggerMiddleware } from 'src/common/middlewares/HttpLogger/httpLogger.middleware';

@Module({
  imports: [
    PrismaModule,
    AiModule,
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes("*")
  }
}
