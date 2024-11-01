import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/login.dto';
import { cookieOptions } from 'src/config/cookies';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('access_token', access_token, cookieOptions);

    return { message: 'Logged in successfully' };
  }
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Ok' };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto) {
    const id = await this.authService.signUp(signUpDto);

    return { message: 'User created successfully', id };
  }
}
