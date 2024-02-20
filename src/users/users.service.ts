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
      console.log(e);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: string) {
    try {
      const user = this.userModel.findById(id).exec();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
      return `Updated \n ${updateUserDto}`;
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: string) {
    try {
      this.userModel.findByIdAndDelete(id).exec();
      return `This action removes a #${id} user`;
    } catch (e) {
      console.log(e);
    }
  }
}
