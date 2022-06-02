import { PlaceLocation } from './location.model';

export interface Offer {
  title: string;
  description?: string;
  price: number;
  dateAvailableFrom: Date;
  dateAvailableTo: Date;
  imageUrl?: string;
  location: PlaceLocation;
}
