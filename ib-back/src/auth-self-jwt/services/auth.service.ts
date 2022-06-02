import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.interface';
import { UsersService } from 'src/users/services/users.service';
import { NewUserDto } from 'src/users/dto/new-user.dto';
import { AuthLoginResponse } from '../models/auth-login-response.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(newUserDto: NewUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(newUserDto.password, 10);
      const createdUser = await this.usersService.createNewUser({
        ...newUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      if (err?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getFullToken(uid: string): AuthLoginResponse {
    const payload: JwtPayload = { sub: uid };
    const token = this.jwtService.sign(payload);
    const expiresIn = this.configService.get('JWT_EXPIRE').replace('s', '');
    const authLoginResponse: AuthLoginResponse = {
      token,
      uid,
      expiresIn,
    };

    return authLoginResponse;
  }
}
// async login(
//   authCredentialsDto: AuthCredentialsDto,
// ): Promise<AuthLoginResponse> {
//   try {
//     const { email, password } = authCredentialsDto;

//     //const user = await this.usersRepository.findOne({ email: email });
//     const user = await this.usersService.getUserByEmail(email);
//     const isPasswordMatching = await bcrypt.compare(password, user.password)

//     if (!isPasswordMatching) {
//       throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
//     }
//     user.password = undefined;

//       const token: string = await this.jwtService.sign(payload);

//       const authLoginResponse: AuthLoginResponse = {
//         token,
//         uid: fullUser.uid,
//         expiresIn: this.configService.get('JWT_EXPIRE'),
//       };
//       return authLoginResponse;
//     } else {
//       throw new UnauthorizedException('Please check your login credentials');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
