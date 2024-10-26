import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { logger } from './config/logger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './config/exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CLIENT_URL, NODE_ENV } from './config/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // helmet configuration
  app.use(helmet());
  // CORS configuration
  app.enableCors({
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    origin: NODE_ENV === 'production' ? CLIENT_URL : '*',
    credentials: true,
  });
  // cookie configuration
  app.use(cookieParser());
  // logger configuration
  app.useLogger(WinstonModule.createLogger({ instance: logger }));
  // log http requests
  app.use(morgan('dev'));
  // validations
  app.useGlobalPipes(new ValidationPipe());
  // exceptions handler
  app.useGlobalFilters(new GlobalExceptionFilter());
  // documentation configuration
  if (NODE_ENV === 'production') {
    const config = new DocumentBuilder()
      .setTitle('Users API')
      .setDescription('The users API with NestJS')
      .setVersion('1.0')
      .addTag('users')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
