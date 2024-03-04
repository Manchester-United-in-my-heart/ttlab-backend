import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto);
      return `Created \n ${createUserDto}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
      return this.userModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }

  remove(id: string) {
    try {
      this.userModel.findByIdAndDelete(id).exec();
      return this.userModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }
}
