import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1664799443912_250',
  koa: {
    port: 7001,
  },
  captcha: {
    expirationTime: 60 * 5,
    noise: 5,
    image: {
      noise: 5,
      size: 5
    }
  },
} as MidwayConfig;
