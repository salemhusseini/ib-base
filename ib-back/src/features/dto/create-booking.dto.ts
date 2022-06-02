import { Type } from 'class-transformer';

import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  placeId: string;

  // @IsNotEmpty()
  // @IsString()
  // placeTitle: string;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  @IsInt()
  numberOfGuests: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateFrom: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateTo: Date;
}
