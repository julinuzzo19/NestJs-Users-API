import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { Config } from 'winston/lib/winston/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.databaseService.query('SELECT id, email, password, nombre FROM usuarios;');
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    const QUERY = `SELECT id, email, password, nombre FROM usuarios 
    WHERE true 
    ${id ? ' AND id = ?' : ''}
    ${email ? ' AND email = ?' : ''}
    `;

    const QUERY_PARAMS = [];

    if (id) {
      QUERY_PARAMS.push(id);
    }
    if (email) {
      QUERY_PARAMS.push(email);
    }

    const rows = await this.databaseService.query(QUERY, QUERY_PARAMS);

    const userFound: User = rows[0];

    console.log({ userFound });

    if (!userFound) {
      throw new NotFoundException();
    }

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
