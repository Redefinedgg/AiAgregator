import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { PrismaService } from 'src/prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateUserResponse,
  GetMeResponse,
  GetUserResponse,
} from '../response/users.response';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(body: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ username: body.username }, { email: body.email }],
        },
      });

      if (user) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          uuid: uuidv4(),
          username: body.username,
          email: body.email,
          password: hashedPassword,
        },
      });

      if (!newUser) {
        throw new InternalServerErrorException('User not created');
      }

      const { password, ...userWithoutPassword } = newUser;

      return { user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<GetUserResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  async getMe(uuid: string): Promise<GetMeResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { user };
    } catch (error) {
      throw error;
    }
  }

  async getUserByUuid(uuid: string): Promise<GetUserResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { uuid } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  async updateUserByUuid(
    uuid: string,
    body: UpdateUserDto,
  ): Promise<GetUserResponse> {
    try {
      if (body.password) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
      }

      if (body.email) {
        if (!body.email.includes('@')) {
          throw new BadRequestException('Email is not valid');
        } else if (body.email.includes('@')) {
          const user = await this.prisma.user.findUnique({
            where: { email: body.email },
          });
          if (user) {
            throw new ConflictException('Email already exists');
          }
        }
      }

      const user = await this.prisma.user.update({
        where: { uuid },
        data: body,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
}
