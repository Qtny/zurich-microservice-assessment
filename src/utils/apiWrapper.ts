import { Response } from 'express';

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export function SuccessfulResponse<T>(
  res: Response,
  status: number,
  message: string,
  data: T,
) {
  return res.status(status).json({
    message,
    data,
  });
}
