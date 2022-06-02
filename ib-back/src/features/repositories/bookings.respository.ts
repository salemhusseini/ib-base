import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@EntityRepository(Booking)
export class BookingsRepository extends Repository<Booking> {
  private logger = new Logger('BookingsRepository');
}
