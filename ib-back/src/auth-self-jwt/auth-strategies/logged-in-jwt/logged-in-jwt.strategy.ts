import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../models/jwt-payload.interface';

import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoggedInJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      // ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.usersService.getUserById(payload.sub);
  }
}
