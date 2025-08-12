import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "../service/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            return this.usersService.getUserById(parseInt(id));
        } catch (error) {
            throw error;
        }
    }
}