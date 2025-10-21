import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { RegisterResponse, LoginResponse } from '../response/auth.response';
import { UsersService } from 'src/modules/users/service/users.service';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailOrNickname } from '../types/auth.type';
import { GoogleAuthService } from './googleAuth.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService,
  ) { }

  async register(body: RegisterDto): Promise<RegisterResponse> {
    try {
      const user = await this.usersService.createUser(body);
      const payload = { uuid: user.user.uuid };
      const token = this.jwtService.sign(payload);
      return { user: user.user, token };
    } catch (error: any) {
      this.logger.error(`Register failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async login(body: LoginDto): Promise<LoginResponse> {
    try {
      const isNicknameOrEmail: EmailOrNickname = body.usernameOrEmail.includes(
        '@',
      )
        ? 'email'
        : 'username';

      if (!body.usernameOrEmail) {
        throw new BadRequestException('Missing username or email');
      }

      if (!body.password) {
        throw new BadRequestException('Missing password');
      }

      const user = await this.prisma.user.findFirst({
        where: { [isNicknameOrEmail]: body.usernameOrEmail },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }

      const { password, ...userWithoutPassword } = user;

      const payload = { uuid: user.uuid };
      const token = this.jwtService.sign(payload);

      return { user: userWithoutPassword, token };
    } catch (error: any) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async validateGoogleUser(googleUser: any) {
    return this.googleAuthService.validateGoogleUser(googleUser);
  }
}
