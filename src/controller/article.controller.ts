import { Inject, Controller, Get, Queries } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
// import { HttpError } from '../error/http.error';

@Controller('/api/article')
export class ArticleController {
  @Inject()
  ctx: Context;

  @Get('/')
  async index(@Queries() cate: any) {
    console.log(cate.cate, cate.id)
    return []
  }
}
