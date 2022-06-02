import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { Booking } from '../models/booking.model';
import { AuthService } from 'src/app/auth/data-access/services/auth.service';

const BACKEND_URL = `${environment.nestApiUrl}`;

@Injectable()
export class BookingsService {
  private _bookings: Booking[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  get bookings() {
    // eslint-disable-next-line no-underscore-dangle
    return this._bookings;
  }

  createBooking(newBooking: Booking) {
    console.log('Create Booking, Before calling API');
    console.log(newBooking);

    return this.http.post<Booking>(`${BACKEND_URL}/bookings`, newBooking);
  }

  getAllUserBookings() {
    return this.http.get<Booking[]>(`${BACKEND_URL}/bookings`);
  }

  getOneUserBooking(bid: string) {
    return this.http.get<Booking>(`${BACKEND_URL}/bookings/${bid}`);
  }
}
