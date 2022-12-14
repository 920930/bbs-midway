import { Inject, Controller, Post, Body, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CaptchaService } from '@midwayjs/captcha';
import { HttpError } from '../error/http.error';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  captchaService: CaptchaService;

  @Post('/login')
  async login(
    @Body()
    info: {
      email: string;
      password: string;
      id: string;
      captcha: string;
    }
  ) {
    console.log(info)
    const passed: boolean = await this.captchaService.check(
      info.id,
      info.captcha
    );
    if (!passed) throw new HttpError('验证码错误或过期');
    const token = await this.userService.login(info);
    return token;
  }

  @Post('/register')
  async register(@Body() info) {
    if (info.password !== info.pwd) throw new HttpError('两次密码不一致');
    const passed: boolean = await this.captchaService.check(
      info.id,
      info.captcha
    );
    if (!passed) throw new HttpError('验证码错误或过期');
    const token = await this.userService.register(info);
    return token;
  }

  @Get('/captcha')
  async captcha() {
    const { id, imageBase64 } = await this.captchaService.image();
    return {
      id,
      img: imageBase64,
    };
  }

  @Get('/user')
  async user() {
    console.log(this.ctx);
  }
}
