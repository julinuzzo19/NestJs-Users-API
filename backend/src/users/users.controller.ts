import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/role';
import { Roles } from 'src/roles/role.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

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

  @Post('profile/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
      storage: diskStorage({
        destination: 'public/avatars',
        filename: (req, file, cb) => {
          cb(
            null,
            `${new Date().getTime()}.${file.originalname.split('.')[1]}`,
          );
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, PNG, and JPEG files are allowed!',
            ),
            false,
          );
        } else {
          return callback(null, true);
        }
      },
    }),
  )
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const userId = req.user.sub;

    return this.usersService.uploadAvatar(userId, file);
  }
}
