import { Module } from "@nestjs/common";
import { StatisticController } from "./controller/statistic.controller";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { StatisticService } from "./service/statistic.service";

@Module({
  imports: [PrismaModule],
  controllers: [StatisticController],
  providers: [StatisticService]
})

export class StatisticModule { }
