import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { logger } from './config/logger';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './config/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] });
  app.useLogger(WinstonModule.createLogger({ instance: logger }));
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
