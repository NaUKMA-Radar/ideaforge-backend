import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureCorsAllowedOriginsList } from './utils/app.utils';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ideaforge')
    .setDescription('The Ideaforge API')
    .setVersion('0.1')
    .build();

  app.enableCors({
    origin: configureCorsAllowedOriginsList(process.env.CORS_ALLOWED_ORIGINS),
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE, CONNECT',
    credentials: true,
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.BACKEND_PORT || 8000);
};

bootstrap();
