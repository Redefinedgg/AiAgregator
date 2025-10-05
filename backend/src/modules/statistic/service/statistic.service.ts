import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/service/prisma.service";
import { TopModelsResponse } from "../response/statistic.response";
import { Period } from "../enum/statistic.enum";

@Injectable()
export class StatisticService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  private readonly logger = new Logger(StatisticService.name);

  async getTopModels(period: Period): Promise<TopModelsResponse> {
    try {
      let dateFilter: Date | undefined;

      const now = new Date();

      switch (period) {
        case Period.ALL:
          break;
        case Period.YEAR:
          dateFilter = new Date(now.getFullYear(), 0, 1);
          break;
        case Period.MONTH:
          dateFilter = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case Period.DAY:
          dateFilter = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        default:
          throw new BadRequestException("Invalid period. Use all, year, month or day.");
      }

      const where = dateFilter ? { createdAt: { gte: dateFilter } } : undefined;

      const top = await this.prisma.message.groupBy({
        by: ["model"],
        where,
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
