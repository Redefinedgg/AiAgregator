// auth.controller.ts
import { Controller, Body, Post, Get, UseGuards, Req, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth login' })
  async googleAuth(@Req() req) {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const result = await this.authService.validateGoogleUser(req.user);
      
      const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${result.token}&userEmail=${result.user.email}&userPassword=${result.user.password}`;
      res.redirect(redirectUrl);
    } catch (error) {
      const errorUrl = `${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent(error.message)}`;
      res.redirect(errorUrl);
    }
  }

}