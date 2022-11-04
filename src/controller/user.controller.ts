import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
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

  @Post('/login')
  async login(@Body() info: { email: string; password: string}) {
    const user = await this.userService.login(info);
    return user;
  }

  @Post('/register')
  async register(@Body() info){
    await this.userService.register(info);
  }
}
