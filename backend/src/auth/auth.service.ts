import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/login.dto';
import { generateUUID } from 'src/utils/generateUUID';
import { User } from 'src/users/entities/user.entity';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({ email });

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
    const user = await this.userService.findOne({ email: signUpDto.email });

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const bodyUserCreate: UserCreateDto = {
      ...signUpDto,
      id: generateUUID(),
      role: 'USER',
      // password: await bcrypt.hash(signUpDto.password, this.saltOrRounds),
      password: '',
    };

    const dtoUser = plainToInstance(UserCreateDto, bodyUserCreate);

    const errors = await validate(dtoUser);
    console.log({ errors });

    if (errors.length > 0) {
      console.log({
        err: errors
          .map((item) => {
            return Object.values(item.constraints)?.join(', ');
          })
          .join(', '),
      });
      throw new BadRequestException(errors);
    } else {
      await this.userService.create(bodyUserCreate);
    }

    return bodyUserCreate.id;
  }
}
