import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { BookingsService } from './data-access/services/bookings.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingsPageRoutingModule],
  declarations: [BookingsPage],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsPageModule {}
