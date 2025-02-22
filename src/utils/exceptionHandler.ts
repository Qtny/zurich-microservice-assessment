import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './apiWrapper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error('Error caught by Exception Filter:', exception);

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        return ApiResponse(
          response,
          HttpStatus.BAD_REQUEST,
          exceptionResponse,
          null,
        );
      }

      return response.status(HttpStatus.BAD_REQUEST).json(exceptionResponse);
    }

    return ApiResponse(
      response,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Something unexpected happened. Please contact the admin.',
      null,
    );
  }
}
