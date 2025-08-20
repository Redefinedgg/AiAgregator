import { ConflictException, InternalServerErrorException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';
import { PrismaService } from 'src/prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  GetUserByIdResponse,
  CreateUserResponse,
} from '../response/users.response';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ nickname: body.nickname }, { email: body.email }],
        },
      });

      if (user) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          uuid: uuidv4(),
          nickname: body.nickname,
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

  async getUserById(id: number): Promise<GetUserByIdResponse> {
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

  async getUserByUuid(uuid: string): Promise<GetUserByIdResponse> {
    try {
      console.log(uuid)
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
}
