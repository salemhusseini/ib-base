import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

import { LoginLocalStrategy } from './auth-strategies/login-local/login-local.strategy';
import { LoggedInJwtStrategy } from './auth-strategies/logged-in-jwt/logged-in-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '3600s',
          // expiresIn: configService.get('JWT_EXPIRE'),
        },
      }),
    }),
  ],
  providers: [AuthService, LoginLocalStrategy, LoggedInJwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, LoggedInJwtStrategy],
})
export class AuthSelfJwtModule {}
