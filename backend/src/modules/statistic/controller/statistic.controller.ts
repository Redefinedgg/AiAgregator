import { Controller } from "@nestjs/common";
import { StatisticService } from "../service/statistic.service";
import { TopModelsResponse } from "../response/statistic.response";

@Controller("statistic")
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService
  ) { }

  async getTopModels(): Promise<TopModelsResponse> {
    return await this.statisticService.getTopModels();
  }
}
