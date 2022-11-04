import { Provide, Inject } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { CaptchaService } from '@midwayjs/captcha';
// import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  @Inject()
  jwtService: JwtService;

  @Inject()
  captchaService: CaptchaService;
  
  async login(options: { email: string; password: string}) {
    return {
      uid: options.email,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async register (info: any) {
    console.log(info)
    const passed: boolean = await this.captchaService.check(info.id, info.captcha);
    console.log(passed)
  }
}
