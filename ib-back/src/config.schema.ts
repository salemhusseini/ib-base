import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // SERVER TYPE and PORT
  STAGE: Joi.string().default('dev'),
  PORT: Joi.number().default(3000),
  // DATABASE
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().required(),
  // FIREBASE ADMIN JSON AND MASTER ACCOUNT
  // GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),
  // MASTER_ACCOUNT_EMAIL: Joi.string().required(),
  // MASTER_ACCOUNT_PASSWORD: Joi.string().required(),
  // MULTER and IMAGES
  // BACKEND_SERVER_URI: Joi.string().required(),
  // BACKEND_IMAGES_PATH_FROM_ROOT: Joi.string().required(),
  // IMAGES_MAX_SIZE: Joi.number().default(1048576).required(),
});
