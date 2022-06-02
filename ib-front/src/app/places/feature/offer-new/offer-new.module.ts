import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferNewPageRoutingModule } from './offer-new-routing.module';

import { OfferNewPage } from './offer-new.page';
import { MapLocationModule } from 'src/app/shared/map-location/map-location.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OfferNewPageRoutingModule,
    MapLocationModule,
  ],
  declarations: [OfferNewPage],
})
export class OfferNewPageModule {}
