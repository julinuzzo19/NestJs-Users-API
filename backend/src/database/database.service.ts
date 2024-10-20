import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor(private configService: ConfigService) {
    this.getConnection();
  }

  private async getConnection() {
    this.connection = await createConnection({
      host: this.configService.get<string>('DB_HOST'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      port: Number(this.configService.get<string>('DB_PORT')),
    });
  }

  public async query(sql: string, values?: any[]) {
    // console.log({ sql, values });
    const [results] = await this.connection.execute(sql, values || []);
    return results;
  }
}
