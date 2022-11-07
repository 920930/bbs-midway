import { createHmac } from 'crypto';
import config from '../config/config.default';

export const md5 = (val: string) => {
  return createHmac('sha512', config.jwt.secret).update(val).digest('hex');
};

export const random = (len = 8) => Math.floor(Math.random() * len);
