import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.usersRepository.create({
      ...userData,
      userId: uuidv4(),
    });
  }

  async updateUser(
    userId: string,
    userData: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userData);
  }

  async deleteUser(userId: string) {
    return this.usersRepository.deleteMany({ userId });
  }
}
