import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminProviders } from '../auth/auth.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AdminService, ...adminProviders],
  exports: [AdminService, ...adminProviders],
})
export class AdminModule {}
