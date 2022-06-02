import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailsPageRoutingModule } from './place-details-routing.module';

import { PlaceDetailsPage } from './place-details.page';
import { BookingsCreateComponent } from 'src/app/bookings/ui/bookings-create/bookings-create.component';
import { MapLocationModule } from 'src/app/shared/map-location/map-location.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    MapLocationModule,
  ],
  declarations: [PlaceDetailsPage, BookingsCreateComponent],
})
export class PlaceDetailsPageModule {}
