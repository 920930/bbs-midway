import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class HttpError extends MidwayHttpError {
  constructor() {
    super('my custom error', HttpStatus.BAD_REQUEST);
  }
}