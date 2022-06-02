import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Booking } from './data-access/models/booking.model';
import { BookingsService } from './data-access/services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings$: Observable<Booking[]>;

  constructor(private bookingsService: BookingsService) {
    this.bookings$ = this.bookingsService.getAllUserBookings();
  }

  ngOnInit() {}

  removeBooking(bid: string, slidingEl: IonItemSliding) {
    console.log(`Booking to remove ${bid}`);
    slidingEl.close();
  }
}
