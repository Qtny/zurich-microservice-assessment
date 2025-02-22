import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export function ApiResponse<T>(
  res: Response,
  status: HttpStatus,
  message: string,
  data: T,
) {
  return res.status(status).json({
    message,
    data,
  });
}
