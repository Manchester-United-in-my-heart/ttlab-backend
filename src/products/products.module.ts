import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database.module';
import { productsProviders } from './products.providers';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ProductsService,
    ...productsProviders,
  ],
})
export class ProductsModule {}
