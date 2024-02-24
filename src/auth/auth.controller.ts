import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../../public-decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return result;
    } catch (e) {
      return { message: e.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
