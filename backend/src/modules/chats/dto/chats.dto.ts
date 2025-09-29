import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChatDto {

  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class UpdateChatDto {
  @IsOptional()
  @IsString()
  name?: string;
}
