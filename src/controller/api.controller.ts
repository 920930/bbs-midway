import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CaptchaService } from '@midwayjs/captcha';
// import { HttpError } from '../error/http.error';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  captchaService: CaptchaService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/captcha')
  async getCaptcha(){
    const { id, imageBase64 } = await this.captchaService.image();
    return {
      id,
      img: imageBase64,
    };
  }
}
