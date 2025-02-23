import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { ApiResponse } from 'src/utils/apiWrapper';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO, @Res() res: Response) {
    const { username, password } = loginDto;

    const token = await this.authService.signIn(username, password);

    return ApiResponse(res, HttpStatus.OK, 'Successfully signed in', { token });
  }
}
