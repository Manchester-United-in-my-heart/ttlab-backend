import { Inject, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Token } from './entities/token.entity';
import { jwtConstants } from './constants';
import { config } from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { CreateAdminDto } from './dtos/create-admin.dto';

config();
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @Inject('TOKEN_MODEL')
    private tokenModel: Model<Token>,
    @Inject('ADMIN_MODEL')
    private adminModel: Model<Token>,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    admin_id: string;
    access_token: string;
    refresh_token: string;
  }> {
    const admin = await this.adminService.findOne(email);
    if (admin?.password !== password) {
      throw new Error('Username or password not correct');
    }

    const payload = {
      username: admin.username,
      email: admin.email,
      image: admin.image,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.access_token_expiresIn,
      secret: jwtConstants.secret,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refresh_token_expiresIn,
      secret: jwtConstants.secret,
    });

    // check if token of this admin is existed ?
    const token = await this.tokenModel.findOne({ admin_id: admin.id });
    if (token) {
      await token.updateOne({
        admin_id: admin.id,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      await this.tokenModel.create({
        admin_id: admin.id,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
    return {
      admin_id: admin.id,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async signInByGoogle(token: any) {
    const ticket = await client.verifyIdToken({
      idToken: token.token,
      audience: process.env.GOOGLE_CLIENT_ID,
      maxExpiry: 12345,
    });
    const payload = ticket.getPayload();
    const requiredPayload: CreateAdminDto = {
      email: payload.email,
      username: payload.name,
      image: payload.picture,
    };
    const adminId = await this.adminService.createOne(requiredPayload);
    const access_token = await this.jwtService.signAsync(requiredPayload, {
      expiresIn: jwtConstants.access_token_expiresIn,
      secret: jwtConstants.secret,
    });
    const refresh_token = await this.jwtService.signAsync(requiredPayload, {
      expiresIn: jwtConstants.refresh_token_expiresIn,
      secret: jwtConstants.secret,
    });

    const admin = await this.tokenModel.findOne({ admin_id: adminId });
    if (admin) {
      await admin.updateOne({
        admin_id: adminId,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      await this.tokenModel.create({
        admin_id: adminId,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
    return {
      admin_id: adminId,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    const token = await this.tokenModel.findOne({
      refresh_token: refreshToken,
    });
    if (!token) {
      throw new Error('Refresh token not found');
    }
    const decodedPayload = this.jwtService.verify(refreshToken, {
      secret: jwtConstants.secret,
    });
    const payload = {
      email: decodedPayload.email,
      username: decodedPayload.username,
      image: decodedPayload.image,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.access_token_expiresIn,
      secret: jwtConstants.secret,
    });
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refresh_token_expiresIn,
      secret: jwtConstants.secret,
    });
    await token.updateOne({
      admin_id: token.admin_id,
      access_token: access_token,
      refresh_token: newRefreshToken,
    });
    return {
      admin_id: token.admin_id,
      access_token: access_token,
      refresh_token: newRefreshToken,
    };
  }

  async getProfile(token) {
    return this.jwtService.decode(token);
  }
}
