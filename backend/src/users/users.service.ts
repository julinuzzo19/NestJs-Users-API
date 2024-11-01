import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { unlink } from 'fs/promises';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserBody: UserCreateDto) {
    return this.userRepository.save(createUserBody);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    return this.userRepository.findOne({
      select: ['id', 'email', 'password', 'role'],
      where: { id, email },
    });
  }

  async update(id: string, updateUserDto: UserUpdateDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {
    // prop avatar is not null in where
    const result = await this.userRepository.findOne({
      select: ['avatar'],
      where: { id, avatar: Not(null) },
    });

    if (result[0]?.avatar) {
      try {
        // delete old avatar if exists
        await unlink(`public/${result[0].avatar}`);
      } catch (error) {
        throw new InternalServerErrorException('Error on delete avatar');
      }
    }
    const filePath = `avatars/${file.filename}`;

    this.userRepository.update(id, { avatar: filePath });

    return { message: 'Avatar cargado correctamente', statusCode: 200 };
  }
}
