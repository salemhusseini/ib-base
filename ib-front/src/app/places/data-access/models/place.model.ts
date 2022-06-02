import { PlaceLocation } from './location.model';

export interface Place {
  pid?: string;
  userId?: string;
  title: string;
  description?: string;
  price: number;
  dateAvailableFrom: Date;
  dateAvailableTo: Date;
  imageUrl?: string;
  location: PlaceLocation;
}
