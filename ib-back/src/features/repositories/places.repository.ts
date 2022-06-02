import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

@EntityRepository(Place)
export class PlacesRepository extends Repository<Place> {
  private logger = new Logger('PlacesRepository');
}
