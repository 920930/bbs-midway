import { App, Provide, Inject } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { HttpError } from '../error/http.error';
import { User } from '../models/user';
// import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  @App()
  app: Application

  @Inject()
  jwtService: JwtService;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;
  
  async login(options: { email: string; password: string}) {
    return {
      uid: options.email,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async register (info: { email: string; password: string; name: string}) {
    const hasUser = await this.userModel.findOne({email: info.email});
    if(hasUser) throw new HttpError('邮箱已存在');
    const user = await this.userModel.create({
      email: info.email,
      name: info.name,
      password: info.password
    })
    const token = this.jwtService.signSync(
      {id: user._id, email: user.email},
      this.app.getConfig('jwt.secret'),
      { expiresIn: this.app.getConfig('jwt.expiresIn'), algorithm: 'HS512' }
    )
    return 'Bearer ' + token;
  }
}
