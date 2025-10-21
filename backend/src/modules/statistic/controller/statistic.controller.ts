import { Controller, Get, Query } from '@nestjs/common';
import { StatisticService } from '../service/statistic.service';
import { LeaderboardResponse } from '../response/statistic.response';
import { Period } from '../enum/statistic.enum';
import { GetLeaderboardDto } from '../dto/statistic.dto';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('leaderboard')
  async getLeaderboard(
    @Query() query: GetLeaderboardDto,
  ): Promise<LeaderboardResponse> {
    return await this.statisticService.getLeaderboard(query);
  }
}
