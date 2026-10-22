import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserRequest: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserRequest);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() createUserRequest: CreateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, createUserRequest);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<boolean> {
    return this.usersService.deleteUser(userId);
  }
}
