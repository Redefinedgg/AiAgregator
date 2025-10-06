import { Model } from "../enum/ai.enum";
import { IsEnum, IsString, IsArray, IsOptional } from "class-validator";
import { Message } from "@prisma/client";

export class SendPromptDto {
  @IsString()
  prompt: string;

  @IsEnum(Model)
  model: Model;
}

export class SendPromptsDto {
  @IsString()
  prompt: string;

  @IsEnum(Model, { each: true })
  models: Model[];
}

export class SmartMergeDto {
  @IsString()
  prompt: string;

  @IsEnum(Model)
  @IsOptional()
  model?: Model;

  @IsArray()
  messages: string[];

  @IsString()
  chatUuid: string;
}

export class LuckyPromptDto {
    @IsString()
    @IsOptional()
    prompt?: string;

    @IsEnum(Model)
    @IsOptional()
    model?: Model;
}
