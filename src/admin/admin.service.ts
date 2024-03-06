import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from '../auth/dtos/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_MODEL')
    private adminModel: Model<Admin>,
  ) {}

  async findOne(username: string) {
    try {
      const admin = await this.adminModel.findOne({ email: username }).exec();
      return admin;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createOne(body: CreateAdminDto) {
    try {
      let admin = await this.adminModel.findOne({ email: body.email }).exec();
      if (admin !== null) return admin._id;
      console.log(body);
      await this.adminModel.create(body);
      admin = await this.adminModel.findOne({ email: body.email }).exec();
      return admin._id;
    } catch (e) {
      throw new Error(e);
    }
  }
}
