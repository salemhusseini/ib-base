import { Type } from 'class-transformer';

import {
  IsDate,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { LocationProperties } from '../models/location-properties.model';

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateAvailableFrom: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateAvailableTo: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl: string;

  //@IsString()

  @IsNotEmpty()
  location: LocationProperties;
}
