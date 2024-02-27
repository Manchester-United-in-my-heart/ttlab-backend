import { Inject, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Token } from './entities/token.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @Inject('TOKEN_MODEL')
    private tokenModel: Model<Token>,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const admin = await this.adminService.findOne(username);
    if (admin?.password !== password) {
      throw new Error('Username or password not correct');
    }

    const payload = { sub: admin.id, username: admin.username };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.access_token_expiresIn,
      secret: jwtConstants.secret,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refresh_token_expiresIn,
      secret: jwtConstants.secret,
    });

    await this.tokenModel.create({
      access_token: access_token,
      refresh_token: refresh_token,
    });

    return {
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
      sub: decodedPayload.sub,
      username: decodedPayload.username,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.access_token_expiresIn,
      secret: jwtConstants.secret,
    });
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refresh_token_expiresIn,
      secret: jwtConstants.secret,
    });
    await token.updateOne({ access_token, refresh_token: newRefreshToken });
    return {
      access_token,
      refresh_token: newRefreshToken,
    };
  }
}
