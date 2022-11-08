import { Inject, Controller, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { CaptchaService } from '@midwayjs/captcha';
// import { HttpError } from '../error/http.error';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  captchaService: CaptchaService;

  @Get('/captcha')
  async getCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image();
    return {
      id,
      img: imageBase64,
    };
  }
}
