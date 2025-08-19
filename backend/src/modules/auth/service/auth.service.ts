import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { RegisterResponse, LoginResponse } from '../response/auth.response';
import { UsersService } from 'src/modules/users/service/users.service';
import { PrismaService } from 'src/prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailOrNickname } from '../types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<RegisterResponse> {
    try {
      const user = await this.usersService.createUser(body);
      const payload = { uuid: user.user.uuid };
      const token = this.jwtService.sign(payload);
      return { user: user.user, token };
    } catch (error) {
      throw error;
    }
  }
  
  async login(body: LoginDto): Promise<LoginResponse> {
    try {
      const isNicknameOrEmail: EmailOrNickname = body.nicknameOrEmail.includes('@') ? "email" : "nickname";

      if (!body.nicknameOrEmail) {
        throw new BadRequestException('Missing nickname or email');
      }

      if (!body.password) {
        throw new BadRequestException('Missing password');
      }

      const user = await this.prisma.user.findFirst({
        where: { [isNicknameOrEmail]: body.nicknameOrEmail },
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

      // ⬇️ Добавляем генерацию токена
      const payload = { uuid: user.uuid };
      const token = this.jwtService.sign(payload);

      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }
}
