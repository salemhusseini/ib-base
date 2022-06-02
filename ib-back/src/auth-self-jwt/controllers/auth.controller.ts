import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthLoginResponse } from '../models/auth-login-response.model';
import { LoginLocalGuard } from '../auth-strategies/login-local/login-local.guard';

import { Response } from 'express';

import { GetUserId } from 'src/users/decoraters/get-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    console.log('im here');
    return this.authService.signUp(authCredentialsDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(LoginLocalGuard)
  @Post('/login')
  login(@GetUserId() uid: string, @Res() response: Response) {
    const responseToeknObj: AuthLoginResponse =
      this.authService.getFullToken(uid);
    return response.send(responseToeknObj);
  }

  // GENERIC
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @UseGuards(LocalAuthenticationGuard)
  // @Post('/login')
  // login(@Req() request: RequestWithUser, @Res() response: Response) {
  //   const user = request.user;
  //   user.password = undefined;
  //   const responseObj: AuthLoginResponse = this.authService.getFullToken(
  //     user.uid,
  //   );
  //   return response.send(user);
  //   return response.send(responseObj);
  // }

  // @Get('blah')
  // //@UseGuards(JwtAuthenticationGuard)
  // async blah(@Headers('Authorization') authorization) {
  //   let bearer = '';

  //   if (typeof authorization != 'undefined') {
  //     bearer = authorization.replace('Bearer ', '');
  //   }
  //   if (bearer === '') {
  //     throw new UnauthorizedException('No Token provided!');
  //   }

  //   const verifyOptions = { secret: this.configService.get('JWT_SECRET') };

  //   const payload = await this.jwtService.verifyAsync(bearer, verifyOptions);
  //   console.log(payload);
  //   console.log(bearer);
  //   return 'hmmm';
  // }

  // @Get('testy')
  // async testy(@Body('someString') someString: string) {
  //   console.log(`got: ${someString}`);

  //   const signed = this.authService.mySign(someString);
  //   console.log(signed);
  //   const bearer = signed.accessToken;
  //   const verifyOptions = { secret: this.configService.get('JWT_SECRET') };

  //   const payload = await this.jwtService.verifyAsync(bearer, verifyOptions);

  //   console.log(payload);

  //   return someString;
  // }
}
