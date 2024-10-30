import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { logger } from 'src/config/logger';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserBody: UserCreateDto) {
    await this.databaseService.query(
      'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
      [
        createUserBody.id,
        createUserBody.email,
        createUserBody.password,
        createUserBody.name,
        createUserBody.role,
      ],
    );

    return 'This action adds a new user';
  }

  async findAll() {
    return await this.databaseService.query(
      'SELECT id, email, password, name, role FROM users;',
    );
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    const QUERY = `SELECT id, email, password, name, role FROM users 
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

    return userFound;
  }

  async update(id: number, updateUserDto: UserUpdateDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {
    const filePath = `avatars/${id}.${file.originalname.split('.')[1]}`;

    this.databaseService.query('UPDATE users SET avatar = ? WHERE id = ?', [
      filePath,
      id,
    ]);

    return { message: 'Avatar cargado correctamente', statusCode: 200 };
  }
}
