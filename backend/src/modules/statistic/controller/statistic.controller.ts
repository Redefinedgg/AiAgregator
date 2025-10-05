import { Controller, Get, Query } from "@nestjs/common";
import { StatisticService } from "../service/statistic.service";
import { TopModelsResponse } from "../response/statistic.response";
import { Period } from "../enum/statistic.enum";
import { GetTopModelsDto } from "../dto/statistic.dto";

@Controller("statistic")
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService
  ) { }

  @Get("top-models")
  async getTopModels(
    @Query() query: GetTopModelsDto
  ): Promise<TopModelsResponse> {
    const period = query.period ?? Period.ALL;
    return await this.statisticService.getTopModels(period);
  }
}
