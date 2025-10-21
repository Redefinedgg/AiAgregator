import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/service/prisma.service";
import { LeaderboardResponse } from "../response/statistic.response";
import { Period } from "../enum/statistic.enum";
import { GetLeaderboardDto } from "../dto/statistic.dto";

@Injectable()
export class StatisticService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  private readonly logger = new Logger(StatisticService.name);

  async getLeaderboard(dto: GetLeaderboardDto): Promise<LeaderboardResponse> {
    try {
      if (!dto.period) {
        dto.period = Period.ALL;
      }
      let dateFilter: Date | undefined;
      const now = new Date();

      switch (dto.period) {
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
      });

      let models: { name: string, messages: number }[] = [];

      top.forEach((model) => {
        if (!model._count.model) return;

        models.push({
          name: model.model,
          messages: model._count.model
        });
      });

      return { models };
    } catch (err) {
      this.logger.error(`Failed to get leaderboard: ${err.message}`, err.stack);
      throw err;
    }
  }
}
