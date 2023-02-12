import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Response } from 'express';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Request() req) {
    return await this.usersService.findMe(req.user);
  }
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Request() req) {
    return await this.usersService.findAll(req.user);
  }
  @UseGuards(JwtGuard)
  @Post('updateUser')
  async updateUser(@Body() createUserDto: CreateUserDto, @Request() req) {
    const user = await this.usersService.updateUser(createUserDto, req.user);
    return user;
  }
  @Get('signout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', { expires: new Date() });
  }
}
