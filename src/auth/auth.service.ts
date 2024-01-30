import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findOne(username);
    if (admin?.password !== password) {
      throw new Error('Username or password not correct');
    }

    const payload = { sub: admin.id, username: admin.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
