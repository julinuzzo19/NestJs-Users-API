import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { logger } from './config/logger';
import helmet from 'helmet';
import { API_PORT } from './config/envs';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] });
  app.useLogger(WinstonModule.createLogger({ instance: logger }));
  app.use(morgan('dev'));
  await app.listen(API_PORT);
}
bootstrap();
