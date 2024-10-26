import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from 'src/config/configs';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.getConnection();
  }

  private async getConnection() {
    this.connection = await createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT as any,
    });
  }

  public async query(sql: string, values?: any[]) {
    // console.log({ sql, values });
    const [results] = await this.connection.execute(sql, values || []);
    return results;
  }
}
