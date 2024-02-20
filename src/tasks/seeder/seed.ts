import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);
  await seederService.seedAll();
  await app.close();
}

bootstrap();
