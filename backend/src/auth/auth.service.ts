import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/login.dto';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'role'],
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const user = await this.userRepository.findOne({
      select: ['email'],
      where: { email: signUpDto.email },
    });

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const bodyUserCreate: UserCreateDto = {
      ...signUpDto,
      role: 'USER',
      password: await bcrypt.hash(signUpDto.password, this.saltOrRounds),
    };

    const dtoUser = plainToInstance(UserCreateDto, bodyUserCreate);

    const errors = await validate(dtoUser);

    if (errors.length > 0) {
      // console.log({
      //   err: errors
      //     .map((item) => {
      //       return Object.values(item.constraints)?.join(', ');
      //     })
      //     .join(', '),
      // });
      throw new BadRequestException(errors);
    } else {
      const resultUserCreate = await this.userRepository.save(bodyUserCreate);

      return resultUserCreate.id;
    }
  }
}
