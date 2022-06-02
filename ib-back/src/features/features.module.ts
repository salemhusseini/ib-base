import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './controllers/bookings.controller';
import { PlacesController } from './controllers/places.controller';

import { BookingsService } from './services/bookings.service';
import { PlacesService } from './services/places.service';

import { BookingsRepository } from './repositories/bookings.respository';
import { PlacesRepository } from './repositories/places.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([BookingsRepository, PlacesRepository]),
  ],
  controllers: [BookingsController, PlacesController],
  providers: [BookingsService, PlacesService],
})
export class FeaturesModule {}
