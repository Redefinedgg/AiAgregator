import { Model } from "../enum/ai.enum";
import { IsEnum, IsString } from "class-validator";

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
