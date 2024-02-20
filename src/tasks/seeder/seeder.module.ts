import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule, DatabaseModule],
  providers: [ProductsModule, UsersModule, SeederService],
})
export class SeederModule {}
