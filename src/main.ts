import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.BACKEND_PORT || 8000);
};

bootstrap();
