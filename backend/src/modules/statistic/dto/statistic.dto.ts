import { IsEnum, IsOptional } from "class-validator";
import { Period } from "../enum/statistic.enum";

export class GetLeaderboardDto {
  @IsOptional()
  @IsEnum(Period)
  period?: Period;
}
