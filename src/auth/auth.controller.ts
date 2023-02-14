import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Request, request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  async login(
    @Body() updateAuthDto: UpdateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(updateAuthDto);
    const authToken = await this.authService.login(updateAuthDto);
    this.authService.storeTokenInCookie(res, authToken);
    res.status(200).send({ message: authToken });
    return;
  }
}
