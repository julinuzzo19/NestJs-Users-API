import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/role';
import { Roles } from 'src/roles/role.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userFound = this.usersService.findOne({ id });

    if (!userFound) {
      throw new NotFoundException();
    }

    return userFound;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
