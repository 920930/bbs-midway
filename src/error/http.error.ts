import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class HttpError extends MidwayHttpError {
  constructor(message: string, code = HttpStatus.BAD_REQUEST) {
    super(message, code);
  }
}