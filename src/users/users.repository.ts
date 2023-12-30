import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(userFilter: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilter);
  }

  async find(userFilter: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilter);
  }

  async create(userData: User): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findOneAndUpdate(
    userFilter: FilterQuery<User>,
    userData: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilter, userData, { new: true });
  }

  async delete(userFilter: FilterQuery<User>) {
    return this.userModel.deleteOne(userFilter);
  }
}
