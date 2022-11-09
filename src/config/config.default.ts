import { MidwayConfig } from '@midwayjs/core';
import { User } from '../models/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1664799443912_250',
  koa: {
    port: 7001,
  },
  host: 'http://127.0.0.1:7001',
  jwt: {
    secret: 'c5fdc752-dcbf-40b3-a9df-1339b5d2a143',
    expiresIn: '2h',
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://localhost:27017/egg',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: '',
          pass: '',
        },
        // 关联实体
        entities: [User],
      },
    },
  },
  cache: {
    store: 'memory',
    options: {
      ttl: 60 * 60, // 默认秒
    },
  },
  captcha: {
    expirationTime: 60 * 5,
    image: {
      noise: Math.floor(Math.random() * 4),
      size: 4,
    },
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
      },
    },
  },
} as MidwayConfig;
