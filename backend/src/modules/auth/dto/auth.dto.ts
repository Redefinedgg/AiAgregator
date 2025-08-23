import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[^@]+$/, {
    message: 'Nickname must not contain "@"',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsOptional()
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;
}
