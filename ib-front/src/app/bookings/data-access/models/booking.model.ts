export interface Booking {
  bid?: string;
  userId?: string;
  placeId?: string;
  placeTitle: string;
  numberOfGuests: number;
  dateFrom: Date;
  dateTo: Date;
}
