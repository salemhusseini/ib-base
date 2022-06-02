import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Place } from '../../features/entities/place.entity';
import { PlacesRepository } from '../../features/repositories/places.repository';
import { Not } from 'typeorm';
import { UpdatePlaceDto } from '../dto/update-place.dto';

@Injectable()
export class PlacesService {
  // LOGGER //
  private logger = new Logger('Places Service');
  constructor(
    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository,
  ) {}

  async createPlace(uid: string, createPlaceDto: CreateOfferDto) {
    this.logger.warn('Creating - Service - Start');
    try {
      const newPlace = { userId: uid, ...createPlaceDto };
      const result = await this.placesRepository.save(newPlace);
      this.logger.warn('Creating - Service - End - Ok');
      return result;
    } catch (err) {
      this.logger.error('Creating - Service - End - error');
      console.log(err);
    }
  }

  async getAllPlaces(): Promise<Place[]> {
    try {
      const result = await this.placesRepository.find({});

      return result;
    } catch (err) {
      console.log('some error getting');
    }
  }

  async getAllAvailablePlaces(uid: string): Promise<Place[]> {
    try {
      const result = await this.placesRepository.find({
        where: { userId: Not(uid) },
      });

      return result;
    } catch (err) {
      console.log('some error getting');
    }
  }

  async getAllUserPlaces(uid: string): Promise<Place[]> {
    try {
      const result = await this.placesRepository.find({
        where: { userId: uid },
      });

      return result;
    } catch (err) {
      console.log('some error getting');
    }
  }
  async getOnePlace(pid): Promise<Place> {
    try {
      const result = await this.placesRepository.findOne(pid);
      if (!result) {
        throw new NotFoundException(`place with id: ${pid} not found`);
      }

      return result;
    } catch (err) {
      if (err.response.statusCode === 404) {
        throw new NotFoundException('find()');
      }
      throw new InternalServerErrorException('the world is over !');
    }
  }

  async updatePlace(
    uid: string,
    pid: string,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place> {
    try {
      await this.placesRepository.update(pid, updatePlaceDto);
      const updatedPlace = await this.getOnePlace(pid);

      if (updatedPlace) {
        return updatedPlace;
      }
      throw new NotFoundException(`couldnt find ${pid}`);
    } catch (err) {
      throw new InternalServerErrorException('Noooooooooo');
    }
  }

  async removeAllPlaces(): Promise<number> {
    const result = await this.placesRepository.delete({});
    console.log('deleted', result.affected);
    return result.affected;
  }

  async removeAllUserPlaces(uid: string): Promise<number> {
    const result = await this.placesRepository.delete({
      userId: uid,
    });
    console.log('deleted', result.affected);
    return result.affected;
  }

  async removeOneUserPlace(pid: string): Promise<number> {
    const result = await this.placesRepository.delete({
      pid,
    });
    console.log('deleted', result.affected);
    return result.affected;
  }
}
