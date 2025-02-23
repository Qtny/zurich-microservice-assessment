import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type JwtPayload = {
  sub: string;
  role: string;
  iat: number;
  exp: number;
};
