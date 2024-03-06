import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { DatabaseModule } from 'src/database/database.module';
import { adminProviders, tokenProviders } from './auth.providers';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminService,
    JwtService,
    ...tokenProviders,
    ...adminProviders,
  ],
})
export class AuthModule {}
