import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[^@]+$/, {
    message: 'Nickname must not contain "@"',
  })
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsOptional()
  @IsString()
  nicknameOrEmail: string;

  @IsString()
  password: string;
}
