import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { BookingsCreateComponent } from '../bookings/ui/bookings-create/bookings-create.component';

import { PlacesService } from './data-access/services/places.service';
import { OffersService } from './data-access/services/offers.service';
import { BookingsPageModule } from '../bookings/bookings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
    BookingsPageModule,
  ],
  declarations: [PlacesPage],
  providers: [PlacesService, OffersService],
})
export class PlacesPageModule {}
