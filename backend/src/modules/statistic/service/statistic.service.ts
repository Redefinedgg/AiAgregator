import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/service/prisma.service";
import { TopModelsResponse } from "../response/statistic.response";

@Injectable()
export class StatisticService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  private readonly logger = new Logger(StatisticService.name);

  async getTopModels(): Promise<TopModelsResponse> {
    try {
      const top = await this.prisma.message.groupBy({
        by: ["model"],
        _count: { model: true },
        orderBy: { _count: { model: "desc" } },
        take: 3
      });

      const [first, second, third] = top.map(m => m.model);

      return {
        first: first ?? null,
        second: second ?? null,
        third: third ?? null
      }
    } catch (err) {
      this.logger.error(`Failed to get top models: ${err.message}`, err.stack);
      throw err;
    }
  }
}
