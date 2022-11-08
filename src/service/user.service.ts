import { App, Provide, Inject } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { HttpError } from '../error/http.error';
import { User } from '../models/user';
import { md5 } from '../utils';
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
    const userOne = await this.userModel.findOne({email: options.email}).select('+password');
    console.log(userOne.toJSON())
    if(!userOne) throw new HttpError('用户不存在')
    if(userOne.password !== md5(options.password)) throw new HttpError('密码错误')
    const token = this.jwtService.signSync(
      {id: userOne._id, email: userOne.email, avatar: userOne.avatar},
      this.app.getConfig('jwt.secret'),
      { expiresIn: this.app.getConfig('jwt.expiresIn'), algorithm: 'HS512' }
    )
    return {
      token: 'Bearer ' + token,
      user: {
        _id: userOne._id,
        name: userOne.name,
        avatar: userOne.avatar
      }
    }
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
      {id: user._id, email: user.email, avatar: user.avatar},
      this.app.getConfig('jwt.secret'),
      { expiresIn: this.app.getConfig('jwt.expiresIn'), algorithm: 'HS512' }
    )
    return {
      token: 'Bearer ' + token,
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar
      }
    }
  }
}
