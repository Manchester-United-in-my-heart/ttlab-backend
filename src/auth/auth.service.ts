import { Inject, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Token } from './entities/token.entity';
import { jwtConstants } from './constants';
import { config } from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { OtpService } from '../otp/otp.service';
import { Admin } from '../admin/entities/admin.entity';

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
    private readonly otpService: OtpService,
    @Inject('TOKEN_MODEL')
    private tokenModel: Model<Token>,
    @Inject('ADMIN_MODEL')
    private adminModel: Model<Token>,
  ) {}

  async signUp(body: CreateAdminDto) {
    const { email, username, password, image, mfa } = { ...body };
    const admin = await this.adminService.findOne(email);
    if (admin) {
      throw new Error('Email already existed');
    }
    const userSecret = await this.otpService.generateUniqueSecret();
    const otpAuth = await this.otpService.generateOTPToken(
      email,
      'TTLAB',
      userSecret,
    );
    const QRCodeImageURL = await this.otpService.generateQRCode(otpAuth);
    // insert to db
    await this.adminModel.create({
      email: email,
      username: username,
      password: password,
      image: image,
      mfa: mfa,
      secret: userSecret,
      qrCodeImageURL: QRCodeImageURL,
    });
    return {
      message: 'Sign up successfully',
      QRCodeImageURL: QRCodeImageURL,
    };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<
    | {
        mfa: false;
        admin_id: string;
        access_token: string;
        refresh_token: string;
      }
    | { mfa: boolean; email: string; password: string }
  > {
    const admin = await this.adminService.findOne(email);
    if (admin?.password !== password) {
      throw new Error('Username or password not correct');
    }

    if (admin?.mfa) {
      return {
        mfa: true,
        email: email,
        password: password,
      };
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
      mfa: false,
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
    const requiredPayload = {
      email: payload.email,
      username: payload.name,
      image: payload.picture,
      mfa: false,
      secret: await this.otpService.generateUniqueSecret(),
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

  async verifyOTP(token: string, email: string, password: string) {
    const admin = await this.adminService.findOne(email);
    if (!admin) {
      throw new Error('Email not found');
    }
    if (admin.password !== password) {
      throw new Error('Password not correct');
    }
    const secret = admin.secret;
    const verified = await this.otpService.verifyOTPToken(token, secret);
    if (!verified) {
      throw new Error('Invalid token');
    } else {
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
  }

  async getProfile(token) {
    return this.jwtService.decode(token);
  }
}
