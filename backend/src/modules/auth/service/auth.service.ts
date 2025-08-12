import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { RegisterResponse, LoginResponse } from '../response/auth.response';
import { UsersService } from 'src/modules/users/service/users.service';
import { PrismaService } from 'src/prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async register(body: RegisterDto): Promise<RegisterResponse> {
    try {
      return this.usersService.createUser(body);
    } catch (error) {
      throw error;
    }
  }

  async login(body: LoginDto): Promise<LoginResponse> {
    try {
      if (!body.email && !body.nickname) {
        throw new BadRequestException('Missing email and nickname');
      }

      if (!body.password) {
        throw new BadRequestException('Missing password');  
      }

      const user = await this.prisma.user.findFirst({
        where: { OR: [{ nickname: body.nickname }, { email: body.email }] },
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

      return { user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
}
