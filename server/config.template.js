const DB_HOST = 'localhost';
const DB_PORT = '27017';
const DB_NAME = '';
const DB_USER = '';
const DB_PASS = '';

const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;
const REDIS_PASS = '';
const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth: REDIS_PASS
};

export default {
  serverPort: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL || `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,

  useExpressStatic: true,

  JWT_SECRET: '',

  uploadPath: 'uploads',

  kue: {
    prefix: 'q_lwm',
    redis: redisConfig
  },
  kueUI: {
    port: 3052
  },

  embedly_key: 'YOUR_KEY'
};
