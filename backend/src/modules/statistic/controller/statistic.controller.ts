import { Controller, Query } from "@nestjs/common";
import { StatisticService } from "../service/statistic.service";
import { TopModelsResponse } from "../response/statistic.response";
import { Period } from "../enum/statistic.enum";

@Controller("statistic")
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService
  ) { }

  async getTopModels(
    @Query("period") period: Period
  ): Promise<TopModelsResponse> {
    return await this.statisticService.getTopModels(period);
  }
}
