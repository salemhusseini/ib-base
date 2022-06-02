import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';

import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { Booking } from '../entities/booking.entity';
import { BookingsRepository } from '../repositories/bookings.respository';

@Injectable()
export class BookingsService {
  // LOGGER //
  private logger = new Logger('Places Service');
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
    private userService: UsersService,
  ) {}

  async getAllBookings(): Promise<Booking[]> {
    try {
      const result = await this.bookingsRepository.find({});
      console.log(result);
      return result;
    } catch (err) {}
  }

  async getAllUserBookings(uid: string): Promise<Booking[]> {
    this.logger.warn('Get All Bookings For User - Service - Start');
    try {
      const result = await this.bookingsRepository.find({
        where: { userId: uid },
      });
      this.logger.warn('Get All Bookings For User - Service - End - Ok');
      return result;
    } catch (err) {
      this.logger.error('Get All Bookings For User - Service - End - error');
      console.log(err);
    }
  }

  async getOneUserBooking(uid: string, bid: string) {
    this.logger.warn('Get One Booking For User - Service - Start');
    try {
      const result = await this.bookingsRepository.find({
        where: {
          user: uid,
          booking: bid,
        },
      });

      if (!result) {
        throw new NotFoundException();
      }
      this.logger.warn('Get One Booking For User - Service - End - Ok');
      return result;
    } catch (err) {
      this.logger.error('Get One Booking For User - Service - End - error');
      console.log(err);
    }
    return `This action returns a Booking booking`;
  }

  async createBooking(uid: string, createBookingDto: CreateBookingDto) {
    this.logger.warn('Creating Booking - Service - Start');
    try {
      const newBooking = { userId: uid, ...createBookingDto };

      const result = await this.bookingsRepository.save(newBooking);

      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async removeAllBookings(): Promise<number> {
    const allBookings = await this.getAllBookings();
    const result = await this.bookingsRepository.remove(allBookings);
    return result.length;
  }
}
// update(id: number, updateBookingDto: UpdateBookingDto) {
//   return `This action updates a #${id} booking`;
// }
