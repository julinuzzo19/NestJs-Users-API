import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { logger } from './config/logger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] });
  app.useLogger(WinstonModule.createLogger({ instance: logger }));
  await app.listen(3010);
}
bootstrap();
