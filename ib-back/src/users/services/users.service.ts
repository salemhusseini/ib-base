import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDto } from '../dto/new-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createNewUser(newUserDto: NewUserDto) {
    const newUser = await this.usersRepository.create(newUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    const fullUser = await this.usersRepository.findOne({ email });
    if (fullUser) {
      return fullUser;
    }
    throw new NotFoundException('couldnt find user by email');
  }

  async getUserById(uid: string) {
    const fullUser = await this.usersRepository.findOne({ uid });
    if (fullUser) {
      return fullUser;
    }
    throw new NotFoundException('couldnt find user by email');
  }
}
