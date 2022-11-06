import { prop, modelOptions } from '@typegoose/typegoose';
import { md5 } from '../utils';

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
export class User {
  @prop()
  public email: string;
  @prop()
  public name: string;
  @prop({
    set: (val: string) => md5(val)
  })
  public password: string;
}