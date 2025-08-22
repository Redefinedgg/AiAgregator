import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserRequest } from 'src/common/types/extendedExpressRequest';
import { GetMeResponse } from '../response/users.response';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from '../dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/id/:id')
  async getUserById(@Param('id') id: string) {
    try {
      return this.usersService.getUserById(parseInt(id));
    } catch (error) {
      throw error;
    }
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async myUser(@Request() req: UserRequest): Promise<GetMeResponse> {
    try {
      return this.usersService.getUserByUuid(req.user.uuid);
    } catch (error) {
      throw error;
    }
  }

  @Put('/me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Request() req: UserRequest, @Body() body: UpdateUserDto) {
    try {
      return this.usersService.updateUserByUuid(req.user.uuid, body);
    } catch (error) {
      throw error;
    }
  }
}
