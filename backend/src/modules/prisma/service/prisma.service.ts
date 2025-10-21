import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger("Prisma");

  constructor() {
    super({
      log: [
        { emit: "event", level: "error" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "info" },
      ]
    });
  }
  async onModuleInit() {
    await this.$connect();

    this.$on("error", (e: Prisma.LogEvent) => {
      this.logger.error(`Prisma error: ${e.message}`);
    });

    this.$on("warn", (e: Prisma.LogEvent) => {
      this.logger.warn(`Prisma warn: ${e.message}`);
    });

    this.$on("info", (e: Prisma.LogEvent) => {
      this.logger.log(`Prisma info: ${e.message}`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
