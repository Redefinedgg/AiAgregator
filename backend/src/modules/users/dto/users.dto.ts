import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {

  @IsString()
    nickname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    nickname?: string;

    @IsEmail()
    email?: string;

    @IsNumber()
    balance?: number;

    @IsString()
    password?: string;

}
