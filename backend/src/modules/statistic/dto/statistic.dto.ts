import { IsEnum, IsOptional } from "class-validator";
import { Period } from "../enum/statistic.enum";

export class GetTopModelsDto {
  @IsOptional()
  @IsEnum(Period)
  period?: Period;
}
