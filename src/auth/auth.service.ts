import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, password: string) {
    // TODO: check if user exist
    // TODO: check if password hash is correct
    return this.signToken(username);
  }

  signToken(username: string) {
    const payload = {
      sub: username,
      role: 'admin',
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }
}
