import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { CreateBookingDto } from '../dto/create-booking.dto';

import { GetUserId } from '../../users/decoraters/get-user-id.decorator';
import { LoggedInJwtGuard } from 'src/auth-self-jwt/auth-strategies/logged-in-jwt/logged-in-jwt.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  @UseGuards(LoggedInJwtGuard)
  createBooking(
    @GetUserId() uid: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(uid, createBookingDto);
  }

  @Get('get-all-bookings')
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @UseGuards(LoggedInJwtGuard)
  @Get('')
  getAllUserBookings(@GetUserId() uid: string) {
    console.log(uid);
    return this.bookingsService.getAllUserBookings(uid);
  }

  @Get(':bid')
  getOneUserBooking(@GetUserId() uid: string, @Param('bid') bid: string) {
    return this.bookingsService.getOneUserBooking(uid, bid);
  }

  @Delete('all-bookings')
  removeAllBookings() {
    return this.bookingsService.removeAllBookings();
  }
}
