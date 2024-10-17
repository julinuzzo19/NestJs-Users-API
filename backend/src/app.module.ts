import { Logger, Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [],
  providers: [DatabaseService, Logger],
})
export class AppModule {}
