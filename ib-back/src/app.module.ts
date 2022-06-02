import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ApiTimerMiddleware } from './common/middleware/api-timer.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthSelfJwtModule } from './auth-self-jwt/auth-self-jwt.module';
import { UsersModule } from './users/users.module';
import { FeaturesModule } from './features/features.module';

const STAGE = process.env.STAGE;
const envToLoad = `.env.stage.${STAGE}`;

@Module({
  imports: [
    AuthSelfJwtModule,
    UsersModule,
    FeaturesModule,

    ConfigModule.forRoot({
      envFilePath: envToLoad,
      // envFilePath: [`.env.stage.dev`],
      isGlobal: true,

      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        //const isProduction = false;

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: !isProduction,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTimerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
