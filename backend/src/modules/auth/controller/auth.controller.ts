import { Controller, Body, Post } from '@nestjs/common';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return this.authService.register(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return this.authService.login(body);
    } catch (error) {
      throw error;
    }
  }
}
