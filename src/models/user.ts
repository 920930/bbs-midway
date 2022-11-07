import { prop, modelOptions } from '@typegoose/typegoose';
import { md5, random } from '../utils';
import configDefault from '../config/config.default';

const imgs = [
  '/avatar/1.jpg',
  '/avatar/2.jpg',
  '/avatar/3.jpg',
  '/avatar/4.jpg',
  '/avatar/5.jpg',
  '/avatar/6.jpg',
  '/avatar/7.jpg',
  '/avatar/8.jpg',
  '/avatar/9.jpg',
  '/avatar/10.jpg',
];

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class User {
  @prop()
  public email: string;
  @prop()
  public name: string;
  @prop({
    set: (val: string) => md5(val),
  })
  public password: string;
  @prop({
    set(val: string) {
      const host = configDefault.host as string;
      if (val.includes(host)) {
        return val.slice(host.length);
      }
      return val;
    },
    get(val: string) {
      return (configDefault.host as string) + val;
    },
    default: imgs[random(imgs.length)],
  })
  public avatar: string;
}
