import { createHmac } from 'crypto';
import config from '../config/config.default'

export const md5 = (val: string) => createHmac('sha512', config.jwt.secret).update(val).digest('hex');