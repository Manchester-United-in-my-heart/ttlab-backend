import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../../public-decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { OtpService } from '../otp/otp.service';
import { CreateAdminDto } from './dtos/create-admin.dto';

interface Test {
  username: string;
  serviceName: string;
  secret: string;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
  ) {}

  @Public()
  @Post('signin')
  async signIn(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    const { username, password } = body;
    try {
      const result = await this.authService.signIn(username, password);
      console.log('result', result);
      return result;
    } catch (e) {
      return { message: e.message };
    }
  }

  @Public()
  @Post('signup')
  async signUp(@Body() body: CreateAdminDto) {
    const { username, password, mfa, image, email } = { ...body };
    try {
      const result = await this.authService.signUp(body);
      return result;
    } catch (e) {
      return { message: e.message };
    }
  }

  @Public()
  @Post('verify-otp')
  async verifyOTP(
    @Body() body: { token: string; email: string; password: string },
  ) {
    const { token, email, password } = body;
    try {
      const result = await this.authService.verifyOTP(token, email, password);
      return result;
    } catch (e) {
      return { message: e.message };
    }
  }

  @Public()
  @Post('signin-2')
  async signIn2(@Body() token: any): Promise<any> {
    return await this.authService.signInByGoogle(token);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (e) {
      return { message: e.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    try {
      return req.user;
    } catch (e) {
      console.log(e);
    }
  }

  @Public()
  @Get('gen-unique')
  generate2fa(@Req() req: Request) {
    try {
      return this.otpService.generateUniqueSecret();
    } catch (e) {
      console.log(e);
    }
  }

  @Public()
  @Post('gen-otp-token')
  generateOTPToken(@Body() body: Test) {
    try {
      return this.otpService.generateOTPToken(
        body.username,
        body.serviceName,
        body.secret,
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Public()
  @Post('gen-qr-code')
  async generateQRCode(@Body() body: Test) {
    try {
      const otpAuth = await this.otpService.generateOTPToken(
        body.username,
        body.serviceName,
        body.secret,
      );
      return this.otpService.generateQRCode(otpAuth);
    } catch (e) {
      console.log(e);
    }
  }

  @Public()
  @Post('verify-token')
  async verifyOTPToken(@Body() body: { token: string; secret: string }) {
    return this.otpService.verifyOTPToken(body.token, body.secret);
  }
}
