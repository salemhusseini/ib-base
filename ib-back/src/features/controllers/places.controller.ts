import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PlacesService } from '../services/places.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { GetUserId } from 'src/users/decoraters/get-user-id.decorator';
import { LoggedInJwtGuard } from 'src/auth-self-jwt/auth-strategies/logged-in-jwt/logged-in-jwt.guard';
import { Place } from '../entities/place.entity';
import { UpdatePlaceDto } from '../dto/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @UseGuards(LoggedInJwtGuard)
  getAllPlaces(): Promise<Place[]> {
    console.log('Hit: getAllPlaces');
    return this.placesService.getAllPlaces();
  }

  @Get('available')
  @UseGuards(LoggedInJwtGuard)
  getAllAvailablePlaces(@GetUserId() uid: string): Promise<Place[]> {
    console.log('Hit: getAllAvailablePlaces');
    return this.placesService.getAllAvailablePlaces(uid);
  }

  @Get('user')
  @UseGuards(LoggedInJwtGuard)
  getAllUserPlaces(@GetUserId() uid: string): Promise<Place[]> {
    console.log('Hit: getAllUserPlaces');

    return this.placesService.getAllUserPlaces(uid);
  }

  @Get(':pid')
  @UseGuards(LoggedInJwtGuard)
  getOnePlace(@Param('pid') pid: string) {
    console.log('Hit: getOnePlace');
    return this.placesService.getOnePlace(pid);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(LoggedInJwtGuard)
  createPlace(
    @Body() createPlaceDto: CreateOfferDto,
    @GetUserId() uid: string,
  ) {
    return this.placesService.createPlace(uid, createPlaceDto);
  }

  @Patch(':pid')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(LoggedInJwtGuard)
  updatePlace(
    @GetUserId() uid: string,
    @Param('pid') pid: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.updatePlace(uid, pid, updatePlaceDto);
  }

  @Delete('clear-all')
  @UseGuards(LoggedInJwtGuard)
  removeAllPlaces(): Promise<number> {
    return this.placesService.removeAllPlaces();
  }

  @Delete('all')
  @UseGuards(LoggedInJwtGuard)
  removeAllUserPlaces(@GetUserId() uid: string): Promise<number> {
    return this.placesService.removeAllUserPlaces(uid);
  }

  @Delete(':pid')
  @UseGuards(LoggedInJwtGuard)
  removeOneUserPlace(@Param('pid') pid: string): Promise<number> {
    return this.placesService.removeOneUserPlace(pid);
  }
}
