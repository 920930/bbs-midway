import { Catch } from '@midwayjs/decorator';
import { MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 所有的未分类错误会到这里
    return {
      status: err.status ?? 500,
      success: false,
      message: err.message,
    };
  }
}
